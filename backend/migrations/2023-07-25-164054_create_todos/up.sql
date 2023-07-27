-- Your SQL goes here
CREATE TABLE todos (
  todo_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed BOOLEAN DEFAULT FALSE
)