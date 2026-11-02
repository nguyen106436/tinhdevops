// Local Windows API. SQL credentials never enter the browser bundle.
const http = require('node:http');
const { randomUUID } = require('node:crypto');
const sql = require('mssql/msnodesqlv8');
const connectionString = process.env.SQL_CONNECTION_STRING || 'Driver={ODBC Driver 17 for SQL Server};Server=.\\SQLEXPRESS;Database=xuantinh_fashion;Trusted_Connection=Yes;Encrypt=No;TrustServerCertificate=Yes;';
const port = Number(process.env.API_PORT || 3001);
let pool;
async function database() {
  if (!pool) pool = new sql.ConnectionPool({ connectionString }).connect().catch(error => { pool = null; throw error; });
  return pool;
}
function validate(product) {
  if (!product || typeof product.name !== 'string' || !product.name.trim() || !['men','women','pants','sport','accessories'].includes(product.category) || !Number.isFinite(product.price) || product.price <= 0 || !Number.isInteger(product.stockCount) || product.stockCount < 0 || typeof product.image !== 'string' || !product.image || !['sizes','colors','highlights'].every(key => Array.isArray(product[key]) && product[key].every(v => typeof v === 'string'))) {
    throw Object.assign(new Error('Thông tin sản phẩm không hợp lệ.'), { status: 400 });
  }
  return product;
}
async function body(req) {
  let text = '';
  for await (const chunk of req) {
    text += chunk;
    if (Buffer.byteLength(text) > 2 * 1024 * 1024) throw Object.assign(new Error('Dữ liệu quá lớn.'), { status: 413 });
  }
  try { return JSON.parse(text); } catch { throw Object.assign(new Error('JSON không hợp lệ.'), { status: 400 }); }
}
http.createServer(async (req, res) => {
  const send = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
  try {
    // This API is intentionally local, with same-origin writes through Vite.
    if (req.headers.origin && !/^http:\/\/(localhost|127\.0\.0\.1):3000$/.test(req.headers.origin)) return send(403, { message: 'Origin không được phép.' });
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith('/api/')) return send(404, { message: 'Không tìm thấy.' });
    const db = await database();
    if (req.method === 'GET' && url.pathname === '/api/health') {
      await db.request().query('SELECT 1 AS ok');
      return send(200, { database: 'xuantinh_fashion', connected: true });
    }
    if (req.method === 'GET' && url.pathname === '/api/products') {
      const result = await db.request().query('SELECT payload FROM dbo.products ORDER BY created_at DESC, id');
      return send(200, result.recordset.map(row => JSON.parse(row.payload)));
    }
    if (req.method === 'PUT' && url.pathname === '/api/products') {
      const products = await body(req);
      if (!Array.isArray(products) || products.length > 2000) return send(400, { message: 'Danh sách không hợp lệ.' });
      products.forEach(validate);
      if (products.some(p => typeof p.id !== 'string' || !p.id || p.id.length > 100) || new Set(products.map(p => p.id)).size !== products.length) return send(400, { message: 'Mã sản phẩm không hợp lệ hoặc trùng lặp.' });
      const tx = new sql.Transaction(db);
      await tx.begin();
      try {
        await new sql.Request(tx).query('DELETE FROM dbo.products');
        for (const p of products) await new sql.Request(tx).input('id', sql.NVarChar(100), p.id).input('payload', sql.NVarChar(sql.MAX), JSON.stringify(p)).query('INSERT dbo.products(id,payload) VALUES(@id,@payload)');
        await tx.commit();
      } catch (error) { await tx.rollback(); throw error; }
      return send(200, products);
    }
    if (req.method === 'POST' && url.pathname === '/api/products') {
      const product = { ...validate(await body(req)), id: randomUUID() };
      await db.request().input('id', sql.NVarChar(100), product.id).input('payload', sql.NVarChar(sql.MAX), JSON.stringify(product)).query('INSERT dbo.products(id,payload) VALUES(@id,@payload)');
      return send(201, product);
    }
    const match = url.pathname.match(/^\/api\/products\/([^/]+)$/);
    if (match && ['PATCH', 'DELETE'].includes(req.method)) {
      const id = decodeURIComponent(match[1]);
      if (req.method === 'DELETE') {
        const result = await db.request().input('id', sql.NVarChar(100), id).query('DELETE FROM dbo.products WHERE id=@id');
        return send(result.rowsAffected[0] ? 200 : 404, { id });
      }
      const result = await db.request().input('id', sql.NVarChar(100), id).query('SELECT payload FROM dbo.products WHERE id=@id');
      if (!result.recordset.length) return send(404, { message: 'Sản phẩm không tồn tại.' });
      const product = validate({ ...JSON.parse(result.recordset[0].payload), ...await body(req), id });
      const updated = await db.request().input('id', sql.NVarChar(100), id).input('payload', sql.NVarChar(sql.MAX), JSON.stringify(product)).query('UPDATE dbo.products SET payload=@payload, updated_at=SYSUTCDATETIME() WHERE id=@id');
      return send(updated.rowsAffected[0] ? 200 : 404, product);
    }
    send(404, { message: 'Không tìm thấy API.' });
  } catch (error) {
    console.error(error.message);
    send(error.status || 503, { message: error.status ? error.message : 'Không kết nối được SQL Server. Kiểm tra backend và cấu hình database.' });
  }
}).listen(port, '127.0.0.1', () => console.log(`SQL API: http://127.0.0.1:${port}`));
