--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)

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
-- Name: links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.links (
    id integer NOT NULL,
    link text NOT NULL,
    "shortLink" text NOT NULL,
    "userId" integer NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.links OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.links_id_seq OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.links (id, link, "shortLink", "userId", views, "createdAt") FROM stdin;
8	https://www.youtube.com/	CXhtjbuSa	1	0	2022-08-06 09:50:05
9	https://www.youtube.com/	4XMwgJsoz	1	0	2022-08-06 09:52:59
10	https://www.youtube.com/	3PVrnE0Pl	1	0	2022-08-06 10:09:10
11	https://www.youtube.com/	yjDNi6b1x	2	0	2022-08-06 10:10:02
12	https://www.youtube.com/	ZZ3S26bYY	1	0	2022-08-06 10:10:06
13	https://www.youtube.com/	HVU4X5XyB	1	0	2022-08-06 10:10:48
14	https://www.driven.com.br/	5F23J6_KB	1	0	2022-08-06 10:10:55
15	https://www.google.com/	JvoylW0UJ	1	0	2022-08-06 10:11:59
16	https://www.driven.com.br/	w9GU01axO	1	0	2022-08-06 10:12:01
17	https://www.youtube.com/	JTJLDcQvA	1	0	2022-08-06 10:12:04
2	https://www.driven.com.br/	_3xAmvO90	2	2	2022-08-06 08:09:36
1	https://www.google.com/	y_cZsM3ql	2	3	2022-08-06 08:09:27
4	https://www.google.com/	GVSQHQ4kW	1	2	2022-08-06 08:09:48
19	https://www.youtube.com/	DRqG9yXOJ	2	0	2022-08-06 11:10:43
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, token, "userId", "createdAt") FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikpvw6NvIiwiZW1haWwiOiJqb2FvQGRyaXZlbi5jb20uYnIiLCJpYXQiOjE2NTk3ODM2ODAsImV4cCI6MTY1OTg3MDA4MH0.0evSt1ySHkBDsZa86zOf4CWYc1W1-I07uh4pZAN30o8	2	2022-08-06 08:01:20
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkZlcm5hbmRvIiwiZW1haWwiOiJmZXJuYW5kb0Bkcml2ZW4uY29tLmJyIiwiaWF0IjoxNjU5Nzg0MDA2LCJleHAiOjE2NTk4NzA0MDZ9.U8R8-OfMln3075eVSGwT1erwKW_Z5CkCKOFAYnAA2Ok	1	2022-08-06 08:06:46
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkFuZHJlc3NhIiwiZW1haWwiOiJhbmRyZXNzYUBkcml2ZW4uY29tLmJyIiwiaWF0IjoxNjU5NzkxNjUwLCJleHAiOjE2NTk3OTE2NjB9.daau6lPX0qmK9Hz26nTwuvagB467tkmCzhMmHhMQH-4	3	2022-08-06 08:08:33
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	Fernando	fernando@driven.com.br	$2b$10$IsJAVJhTM5EQ2JEY81KJruVnOuAHku7ALj1Yq9NioZWKVm4sdG.fi	2022-08-06 07:54:50
2	João	joao@driven.com.br	$2b$10$x.mKc8Oiu8DwAQWdhIOC1.xjxtw0oGf43WPX2UlSiSBkpM4ZRQJLa	2022-08-06 07:54:55
3	Andressa	andressa@driven.com.br	$2b$10$LjhwJPB.x54NlozgYZeJvumN6u5smd.V/.42qQmlEDA3syNsRfWBG	2022-08-06 07:54:58
4	Eduardo	eduardo@driven.com.br	$2b$10$fxty81pUD0q54HmwhViRb.1dRjwV2ZhLdbU4comUKA5yCgQ5V/JO6	2022-08-06 07:55:00
5	Gabi	gabi@driven.com.br	$2b$10$.xzxYnWPxp/erVd6azNEPOGhBmTPvIy7sFKf1EATCQOjBh0.cgmim	2022-08-06 07:55:02
6	Joana	joana@driven.com.br	$2b$10$T4Z5KCKICY0sngEEQD3pU.PhkYwXOZn5NZHHvlNlOIEGcb5mVeUqe	2022-08-06 07:55:06
7	Aline	aline@driven.com.br	$2b$10$L2E2mOIx3om94Z0B4cbvlOOTrZayDsknZ8/a5BZOUDpQpHWeDBVY.	2022-08-06 07:55:08
8	Frank	frank@driven.com.br	$2b$10$8T1YO/PtFeAfZMlVK2dM1OnkVCNtBPQZK12osO9jJDNPIHAyl0Oki	2022-08-06 07:55:11
9	Concita	concita@driven.com.br	$2b$10$x.aH0ntCd04BfXokkHdP9.pE5xalc/jS33wz8wLrLdKQoay/yoaC6	2022-08-06 07:55:13
10	Marina	ma@driven.com.br	$2b$10$nialBorXAsMoR6Oh5s90oOGBYCJzup3X44FfzfrvrWC6Flg73ZNDu	2022-08-06 07:55:15
11	Pedrão	pedrao@driven.com.br	$2b$10$LRfowMboxJudyzkTvGZdmea8CAp5qH0xkRjcr/WgXL.ezNfZeG.HG	2022-08-06 07:55:17
12	leandro	leandro@driven.com.br	$2b$10$MbV3FF4AuJs1tR4PrDaKheeXvAOSyUPPt7VqCO2S5FT2.J23yaaHe	2022-08-06 07:55:20
\.


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.links_id_seq', 19, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: links links_shortLink_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_shortLink_key" UNIQUE ("shortLink");


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: sessions sessions_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_key" UNIQUE ("userId");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

