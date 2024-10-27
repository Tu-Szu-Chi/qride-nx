CREATE TABLE bo_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TRIGGER update_bo_users_modtime
BEFORE UPDATE ON bo_users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- 插入默認用戶
-- 密碼: admin123
INSERT INTO bo_users (username, password, role) VALUES
('admin', '$2b$10$4I1V032XSoogyZy5iA7Xp.GYsXIaEf/nNJpiQYplHtX7hLX4dNoj2', 'admin');

-- 密碼: agent123
INSERT INTO bo_users (username, password, role) VALUES
('agent', '$2b$10$QyYcTz.Y1kWGAg00pkBSgOmcg51WoVDtHni551uJKt7p9huqRI5Ku', 'agent');
