-- 創建自定義類型
CREATE TYPE discount_type AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');
CREATE TYPE user_restriction_type AS ENUM ('USER_GROUP', 'USER_LEVEL', 'SPECIFIC_USERS');
CREATE TYPE product_restriction_type AS ENUM ('CATEGORY', 'BRAND', 'SPECIFIC_PRODUCTS');

-- 優惠券主表
CREATE TABLE public.coupon_main (
    id BIGSERIAL PRIMARY KEY,
    description TEXT,
    discount_type discount_type NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_spend DECIMAL(10,2) DEFAULT 0,
    max_discount_amount DECIMAL(10,2),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    total_quantity INTEGER,
    used_quantity INTEGER DEFAULT 0,
    max_use_per_user INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- 使用 JSONB 存儲額外的可擴展屬性
    metadata JSONB DEFAULT '{}'::JSONB,
    
    -- 使用 array 存儲簡單的限制條件
    excluded_categories INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    excluded_products INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- -- 確保折扣值在合理範圍內
    -- CONSTRAINT valid_percentage CHECK (
    --     discount_type != 'PERCENTAGE' OR 
    --     (discount_value > 0 AND discount_value <= 100)
    -- ),
    -- CONSTRAINT valid_fixed_amount CHECK (
    --     discount_type != 'FIXED_AMOUNT' OR 
    --     discount_value > 0
    -- )
);
CREATE TABLE public.coupon_mapping (
    code VARCHAR(50) PRIMARY KEY,
    coupon_id BIGSERIAL NOT NULL REFERENCES coupon_main(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
)

-- 創建更新時間的觸發器

CREATE TRIGGER update_coupons_updated_at
    BEFORE UPDATE ON coupon_main
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

-- 優惠券使用記錄
CREATE TABLE coupon_record (
    id BIGSERIAL PRIMARY KEY,
    coupon_id BIGINT NOT NULL REFERENCES coupon_main(id),
    coupon_code VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    order_id BIGINT,
    dealer_id VARCHAR(100),
    used_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- 記錄使用時的快照數據
    usage_metadata JSONB DEFAULT '{}'::JSONB
);



-- -- 用戶限制條件
-- CREATE TABLE coupon_user_restrictions (
--     id BIGSERIAL PRIMARY KEY,
--     coupon_id BIGINT NOT NULL REFERENCES coupon_main(id),
--     restriction_type user_restriction_type NOT NULL,
--     -- 使用 JSONB 存儲複雜的限制規則
--     restriction_rules JSONB NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- -- 產品限制條件
-- CREATE TABLE coupon_product_restrictions (
--     id BIGSERIAL PRIMARY KEY,
--     coupon_id BIGINT NOT NULL REFERENCES coupons(id),
--     restriction_type product_restriction_type NOT NULL,
--     -- 使用 JSONB 存儲複雜的限制規則
--     restriction_rules JSONB NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );


-- 創建索引
CREATE INDEX idx_coupon_main_dates ON public.coupon_main(start_date, end_date);
CREATE INDEX idx_coupon_mapping_coupon_id ON public.coupon_mapping(coupon_id);
CREATE INDEX idx_coupon_mapping_code_coupon_id ON public.coupon_mapping(code, coupon_id);
CREATE INDEX idx_coupon_mapping_code_pattern ON public.coupon_mapping USING btree (lower(code) text_pattern_ops);
CREATE INDEX idx_coupon_record_coupon_id ON public.coupon_record(coupon_id);
CREATE INDEX idx_coupon_record_user_id ON public.coupon_record(user_id);

-- 創建 GIN 索引用於 JSONB 欄位的快速搜索
-- CREATE INDEX idx_coupons_metadata ON coupons USING GIN (metadata);
-- CREATE INDEX idx_coupon_user_restrictions_rules ON coupon_user_restrictions USING GIN (restriction_rules);
-- CREATE INDEX idx_coupon_product_restrictions_rules ON coupon_product_restrictions USING GIN (restriction_rules);