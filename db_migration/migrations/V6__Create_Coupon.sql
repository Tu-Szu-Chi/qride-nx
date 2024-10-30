DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'discount_type') THEN
        CREATE TYPE discount_type AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_restriction_type') THEN
        CREATE TYPE user_restriction_type AS ENUM ('USER_GROUP', 'USER_LEVEL', 'SPECIFIC_USERS');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_restriction_type') THEN
        CREATE TYPE product_restriction_type AS ENUM ('CATEGORY', 'BRAND', 'SPECIFIC_PRODUCTS');
    END IF;
END
$$;

-- 優惠券主表
CREATE TABLE IF NOT EXISTS public.coupon_main (
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
    metadata JSONB DEFAULT '{}'::JSONB,
    excluded_categories INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    excluded_products INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 優惠券代碼映射表
CREATE TABLE IF NOT EXISTS public.coupon_mapping (
    code VARCHAR(50) PRIMARY KEY,
    coupon_id BIGINT NOT NULL REFERENCES public.coupon_main(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 創建更新時間的觸發器
CREATE TRIGGER update_coupons_updated_at
    BEFORE UPDATE ON public.coupon_main
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

-- 優惠券使用記錄
CREATE TABLE IF NOT EXISTS public.coupon_record (
    id BIGSERIAL PRIMARY KEY,
    coupon_id BIGINT NOT NULL REFERENCES public.coupon_main(id),
    coupon_code VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    order_id BIGINT,
    dealer_id VARCHAR(100),
    used_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    usage_metadata JSONB DEFAULT '{}'::JSONB
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_coupon_main_dates ON public.coupon_main(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_coupon_mapping_coupon_id ON public.coupon_mapping(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_mapping_code_coupon_id ON public.coupon_mapping(code, coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_mapping_code_pattern ON public.coupon_mapping USING btree (lower(code) text_pattern_ops);
CREATE INDEX IF NOT EXISTS idx_coupon_record_coupon_id ON public.coupon_record(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_record_user_id ON public.coupon_record(user_id);