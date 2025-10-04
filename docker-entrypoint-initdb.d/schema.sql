CREATE TABLE listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    location VARCHAR(255),
    listing_type VARCHAR(50),
    images TEXT,             -- Changed from JSON to TEXT
    cloudinary_ids TEXT,     -- Changed from JSON to TEXT
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contact_number VARCHAR(15),
    password_hash VARCHAR(255) NOT NULL,
    is_verified TINYINT(1) DEFAULT 0,
    verification_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


{/*CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contact_number VARCHAR(15),
    password_hash VARCHAR(255) NOT NULL,
    is_verified TINYINT(1) DEFAULT 0,
    -- New column: Stores a unique value (nonce) included in the JWT for one-time use
    verification_nonce VARCHAR(255) NULL,
    -- Recommended: Tracks when the verification link should expire
    verification_expires_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/}


-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    location VARCHAR(255),
    listing_type VARCHAR(50),
    images TEXT,             
    cloudinary_ids TEXT,     
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contact_number VARCHAR(15),
    password_hash VARCHAR(255) NOT NULL,
    is_verified TINYINT(1) DEFAULT 0,
    verification_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed a default test user (normal user, not admin)
INSERT INTO users (name, email, contact_number, password_hash, is_verified)
VALUES (
    'Test User',
    'testuser@corent.lk',
    '0779876543',
    -- password = "test123" (bcrypt hash)
    '$2b$10$IRykUhnFe7JbQeTm06.6de3zmgf33z4qInknnRPvZe3KXUOBOvzuq',
    1
);
