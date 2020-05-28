--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

-- Started on 2020-01-13 11:12:19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2892 (class 1262 OID 17163)
-- Name: myla; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE myla WITH TEMPLATE = template0 ENCODING = 'UTF8';


ALTER DATABASE myla OWNER TO postgres;

\connect myla

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 209 (class 1259 OID 17273)
-- Name: answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answer (
    answer_id integer NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    answer text NOT NULL,
    question_id integer NOT NULL,
    survey_id integer NOT NULL
);


ALTER TABLE public.answer OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 17271)
-- Name: answer_answer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answer_answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answer_answer_id_seq OWNER TO postgres;

--
-- TOC entry 2893 (class 0 OID 0)
-- Dependencies: 208
-- Name: answer_answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answer_answer_id_seq OWNED BY public.answer.answer_id;


--
-- TOC entry 203 (class 1259 OID 17212)
-- Name: survey_comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.survey_comment (
    comment_id integer NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    text text NOT NULL,
    survey_id integer NOT NULL
);


ALTER TABLE public.survey_comment OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 17210)
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_comment_id_seq OWNER TO postgres;

--
-- TOC entry 2894 (class 0 OID 0)
-- Dependencies: 202
-- Name: comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_comment_id_seq OWNED BY public.survey_comment.comment_id;


--
-- TOC entry 205 (class 1259 OID 17228)
-- Name: survey_master_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.survey_master_group (
    group_id integer NOT NULL,
    name character varying NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.survey_master_group OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17226)
-- Name: group_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.group_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_group_id_seq OWNER TO postgres;

--
-- TOC entry 2895 (class 0 OID 0)
-- Dependencies: 204
-- Name: group_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.group_group_id_seq OWNED BY public.survey_master_group.group_id;


--
-- TOC entry 207 (class 1259 OID 17244)
-- Name: question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question (
    question_id integer NOT NULL,
    question_json text NOT NULL,
    is_template boolean,
    is_public_template boolean,
    survey_master_id integer NOT NULL
);


ALTER TABLE public.question OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 17242)
-- Name: question_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_question_id_seq OWNER TO postgres;

--
-- TOC entry 2896 (class 0 OID 0)
-- Dependencies: 206
-- Name: question_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_question_id_seq OWNED BY public.question.question_id;


--
-- TOC entry 201 (class 1259 OID 17199)
-- Name: survey; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.survey (
    survey_id integer NOT NULL,
    timestamp_start timestamp with time zone,
    timestamp_end timestamp with time zone,
    survey_master_id integer NOT NULL,
    survey_code character varying NOT NULL,
    survey_title character varying
);


ALTER TABLE public.survey OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 17177)
-- Name: survey_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.survey_master (
    survey_master_id integer NOT NULL,
    title character varying NOT NULL,
    description text,
    is_template boolean DEFAULT false,
    is_public_template boolean DEFAULT false,
    user_id integer NOT NULL,
    group_id integer,
    results_visible boolean DEFAULT false
);


ALTER TABLE public.survey_master OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 17175)
-- Name: survey_master_survey_master_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.survey_master_survey_master_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.survey_master_survey_master_id_seq OWNER TO postgres;

--
-- TOC entry 2897 (class 0 OID 0)
-- Dependencies: 198
-- Name: survey_master_survey_master_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.survey_master_survey_master_id_seq OWNED BY public.survey_master.survey_master_id;


--
-- TOC entry 200 (class 1259 OID 17197)
-- Name: survey_survey_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.survey_survey_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.survey_survey_id_seq OWNER TO postgres;

--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 200
-- Name: survey_survey_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.survey_survey_id_seq OWNED BY public.survey.survey_id;


--
-- TOC entry 197 (class 1259 OID 17166)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    session_id character varying,
    is_admin boolean DEFAULT false,
    password_change_required boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 17164)
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO postgres;

--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 196
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2739 (class 2604 OID 17276)
-- Name: answer answer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer ALTER COLUMN answer_id SET DEFAULT nextval('public.answer_answer_id_seq'::regclass);


--
-- TOC entry 2738 (class 2604 OID 17247)
-- Name: question question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question ALTER COLUMN question_id SET DEFAULT nextval('public.question_question_id_seq'::regclass);


--
-- TOC entry 2735 (class 2604 OID 17202)
-- Name: survey survey_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey ALTER COLUMN survey_id SET DEFAULT nextval('public.survey_survey_id_seq'::regclass);


--
-- TOC entry 2736 (class 2604 OID 17215)
-- Name: survey_comment comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_comment ALTER COLUMN comment_id SET DEFAULT nextval('public.comment_comment_id_seq'::regclass);


--
-- TOC entry 2731 (class 2604 OID 17180)
-- Name: survey_master survey_master_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_master ALTER COLUMN survey_master_id SET DEFAULT nextval('public.survey_master_survey_master_id_seq'::regclass);


--
-- TOC entry 2737 (class 2604 OID 17231)
-- Name: survey_master_group group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_master_group ALTER COLUMN group_id SET DEFAULT nextval('public.group_group_id_seq'::regclass);


--
-- TOC entry 2728 (class 2604 OID 17169)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- TOC entry 2757 (class 2606 OID 17281)
-- Name: answer answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT answer_pkey PRIMARY KEY (answer_id);


--
-- TOC entry 2751 (class 2606 OID 17220)
-- Name: survey_comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 2753 (class 2606 OID 17236)
-- Name: survey_master_group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_master_group
    ADD CONSTRAINT group_pkey PRIMARY KEY (group_id);


--
-- TOC entry 2755 (class 2606 OID 17252)
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (question_id);


--
-- TOC entry 2747 (class 2606 OID 17885)
-- Name: survey survey_code; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey
    ADD CONSTRAINT survey_code UNIQUE (survey_code);


--
-- TOC entry 2745 (class 2606 OID 17185)
-- Name: survey_master survey_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_master
    ADD CONSTRAINT survey_master_pkey PRIMARY KEY (survey_master_id);


--
-- TOC entry 2749 (class 2606 OID 17204)
-- Name: survey survey_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey
    ADD CONSTRAINT survey_pkey PRIMARY KEY (survey_id);


--
-- TOC entry 2741 (class 2606 OID 17293)
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 2743 (class 2606 OID 17174)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2759 (class 2606 OID 17237)
-- Name: survey_master group_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_master
    ADD CONSTRAINT group_fkey FOREIGN KEY (group_id) REFERENCES public.survey_master_group(group_id);


--
-- TOC entry 2764 (class 2606 OID 17282)
-- Name: answer question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT question_fkey FOREIGN KEY (question_id) REFERENCES public.question(question_id);


--
-- TOC entry 2761 (class 2606 OID 17258)
-- Name: survey_comment survey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_comment
    ADD CONSTRAINT survey_fkey FOREIGN KEY (survey_id) REFERENCES public.survey(survey_id);


--
-- TOC entry 2765 (class 2606 OID 17287)
-- Name: answer survey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT survey_fkey FOREIGN KEY (survey_id) REFERENCES public.survey(survey_id);


--
-- TOC entry 2763 (class 2606 OID 17253)
-- Name: question survey_master_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT survey_master_fkey FOREIGN KEY (survey_master_id) REFERENCES public.survey_master(survey_master_id);


--
-- TOC entry 2760 (class 2606 OID 17266)
-- Name: survey survey_master_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey
    ADD CONSTRAINT survey_master_fkey FOREIGN KEY (survey_master_id) REFERENCES public.survey_master(survey_master_id);


--
-- TOC entry 2758 (class 2606 OID 17192)
-- Name: survey_master user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_master
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2762 (class 2606 OID 17674)
-- Name: survey_master_group user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_master_group
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2020-01-13 11:12:20

--
-- PostgreSQL database dump complete
--

