
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 16455)
-- Name: posts; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE public.product (
    id character varying(255) NOT NULL,
    user_id character varying(100) NOT NULL,
    vin character varying(100) NOT NULL,
    engine_number character varying(100) NOT NULL,
    model character varying(100) NOT NULL,
    purchase_date date NOT NULL,
    registration_date date NOT NULL,
    dealer_name character varying(100) NOT NULL,
    year INTEGER NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


CREATE TRIGGER update_product_modtime BEFORE UPDATE ON public.product FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();
