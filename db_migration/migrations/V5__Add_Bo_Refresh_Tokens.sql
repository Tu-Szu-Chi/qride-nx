CREATE TABLE bo_refresh_tokens (
    user_id UUID PRIMARY KEY REFERENCES bo_users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bo_refresh_tokens_token ON bo_refresh_tokens(token);
