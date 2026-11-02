IF DB_ID(N'xuantinh_fashion') IS NULL
    CREATE DATABASE [xuantinh_fashion];
GO
USE [xuantinh_fashion];
GO
IF OBJECT_ID(N'dbo.products', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.products (
        id nvarchar(100) NOT NULL PRIMARY KEY,
        payload nvarchar(max) NOT NULL CHECK (ISJSON(payload) = 1),
        created_at datetime2 NOT NULL DEFAULT SYSUTCDATETIME(),
        updated_at datetime2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END;
GO
