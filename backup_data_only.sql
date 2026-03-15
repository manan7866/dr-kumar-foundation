--
-- PostgreSQL database data import (compatible with existing Prisma schema)
-- Modified to work with existing schema - data only import
-- Data inserted in correct order to satisfy foreign key constraints
--

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- First: Insert Regions (required by Member and Registration)
--

COPY public."Region" (id, continent, created_at, countries, name, updated_at) FROM stdin;
f5a02936-9ce2-459f-afe1-a1e891b60bf0	Asia	2026-03-09 13:39:59.014	["India","Pakistan","Bangladesh","Sri Lanka","Nepal","Maldives","Afghanistan","Bhutan"]	South Asia	2026-03-09 13:39:59.014
991dac95-dc9c-42b3-a208-581469839bba	Asia	2026-03-09 13:39:59.324	["Saudi Arabia","UAE","Qatar","Kuwait","Bahrain","Oman","Jordan","Turkey","Iran"]	Middle East	2026-03-09 13:39:59.324
e547df5f-1362-4b45-bb32-05f9bd8602a3	Europe	2026-03-09 13:39:59.687	["UK","France","Germany","Italy","Spain","Netherlands","Belgium","Sweden","Norway","Denmark"]	Europe	2026-03-09 13:39:59.687
5b2553c1-90e2-4842-9563-b57b358b90d2	North America	2026-03-09 13:39:59.955	["United States","Canada","Mexico"]	North America	2026-03-09 13:39:59.955
3e1eb30b-f36a-4967-adf2-67397fc04e25	Africa	2026-03-09 13:40:00.218	["Morocco","Algeria","Tunisia","Egypt","Libya","Mali","Mauritania"]	Africa	2026-03-09 13:40:00.218
275b9a7a-cd01-41c0-b2be-f77980f80cab	Asia	2026-03-09 13:40:00.639	["Indonesia","Malaysia","Brunei","Singapore","Thailand","Philippines"]	Southeast Asia	2026-03-09 13:40:00.639
79bd6139-9d74-41fa-9aed-23bca02ab6c1	Asia	2026-03-09 13:40:00.961	["Kazakhstan","Uzbekistan","Kyrgyzstan","Tajikistan","Turkmenistan","Azerbaijan"]	Central Asia	2026-03-09 13:40:00.961
59160a9d-7f05-45a7-97e9-fd846952cee8	South America	2026-03-09 13:40:01.28	["Brazil","Argentina","Chile","Colombia","Peru"]	South America	2026-03-09 13:40:01.28
0285da4b-2160-46fa-9382-fdcc666eee9c	Oceania	2026-03-09 13:40:01.6	["Australia","New Zealand"]	Oceania	2026-03-09 13:40:01.6
\.


--
-- Second: Insert Users (required by AuditLog and other tables)
--

COPY public."User" (id, email, password_hash, full_name, avatar_url, role, is_active, approval_status, created_at, updated_at, assigned_programs) FROM stdin;
d273d42e-4c08-4079-ac28-4ac45029651a	user1@drkumarfoundation.org	$2b$12$N/PE3sDvgCLH0G1xqNXcweLR95.7wwINs/u6YBdO/yoGjLYym2Lxa	Test User One	\N	program_director	t	approved	2026-03-03 17:00:51.037	2026-03-03 17:00:51.037	\N
2cbf366a-0fe3-4fa9-9752-b10f93c75622	user2@drkumarfoundation.org	$2b$12$CHdZdFV7YPvydnRoZ6iu0Ot0Y3d3p9HKOky7yZ0q3XDZVpprbE.jq	Test User Two	\N	moderator	t	approved	2026-03-03 17:00:52.294	2026-03-03 17:00:52.294	\N
d4927dd6-f4fb-4722-985e-46cbf0929631	youth@email.com	$2b$12$i8G0pOlIlExkaHB.nEpzPu7IVPo2Lrf82b4LFklr5/fwM4JioOuvO	Youth Engagement Director	\N	program_director	t	approved	2026-03-04 04:33:56.053	2026-03-04 04:33:56.053	\N
88af9ad6-48b2-455e-bcc9-e83f83fea97f	music@email.com	$2b$12$i8G0pOlIlExkaHB.nEpzPu7IVPo2Lrf82b4LFklr5/fwM4JioOuvO	Sufi Music Programs Director	\N	program_director	t	approved	2026-03-04 04:33:56.541	2026-03-04 04:33:56.541	\N
b2048864-5480-4b38-bc26-f10cf8f0517	ecommerce@email.com	$2b$12$i8G0pOlIlExkaHB.nEpzPu7IVPo2Lrf82b4LFklr5/fwM4JioOuvO	Sufi Ecommerce Director	\N	program_director	t	approved	2026-03-04 04:33:57.041	2026-03-04 04:33:57.041	\N
25c75a5f-bcfa-4933-afb0-440f85f1f140	science@email.com	$2b$12$i8G0pOlIlExkaHB.nEpzPu7IVPo2Lrf82b4LFklr5/fwM4JioOuvO	Sufi Science Programs Director	\N	program_director	t	approved	2026-03-04 04:33:57.575	2026-03-04 04:33:57.575	\N
20b895b9-434a-41e7-8cda-d87acf2b7b69	interfaith@email.com	$2b$12$i8G0pOlIlExkaHB.nEpzPu7IVPo2Lrf82b4LFklr5/fwM4JioOuvO	Interfaith Programs Director	\N	program_director	t	approved	2026-03-04 04:33:58.075	2026-03-04 04:33:58.075	\N
860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	$2b$12$pxzT.7weEHGOtfaVfilWY.kvqNrLiF4dvf2lps4m61ahhtZPTgQES	Site Administrator	https://res.cloudinary.com/dypdtkbzc/image/upload/v1772599542/dr-kumar-profiles/avatar_860afc0d-d061-4bab-9332-51338f2397fa_1772599542338.jpg	super_admin	t	approved	2026-03-03 16:13:44.723	2026-03-04 04:45:43.274	\N
7bcda147-cbb1-43fe-8402-d87268f48d04	healing@email.com	$2b$12$i8G0pOlIlExkaHB.nEpzPu7IVPo2Lrf82b4LFklr5/fwM4JioOuvO	Healing Programs Director	\N	healing_contributor	t	approved	2026-03-04 04:33:54.975	2026-03-04 19:22:03.127	\N
247453e5-21a0-4b4c-aea1-2a772e43349d	testuser@gmail.com	$2b$12$9rkl0GUoR3aU./kykRWAM.1z.gcyew37hSmDjRg.1/T5K8XuZMm7i	test user	\N	contributor	t	approved	2026-03-10 05:12:08.396	2026-03-10 13:14:33.254	{}
12ff0ec7-0ce7-4164-901d-6f7dc6e47c61	testingusertwo@gmail.com	$2b$12$WqWzzDpTIHBUJsbACLWir.j19OpMdaojBP3zgvnZTgLNofV5SF4ue	testing user two	\N	contributor	f	pending	2026-03-10 07:18:01.576	2026-03-10 13:14:38.325	{}
548d9e1b-0ccd-420e-9a31-c8375ff9095e	environment@email.com	$2b$12$i8G0pOlIlExkaHB.nEpzPu7IVPo2Lrf82b4LFklr5/fwM4JioOuvO	Environmental Programs Director	https://res.cloudinary.com/dypdtkbzc/image/upload/v1772709476/dr-kumar-profiles/avatar_548d9e1b-0ccd-420e-9a31-c8375ff9095e_1772709475976.jpg	environmental_contributor	t	approved	2026-03-04 04:33:55.508	2026-03-10 15:41:40.997	\N
\.


--
-- Third: Insert UserPrograms (required by Contribution and Task)
--

COPY public."UserProgram" (id, user_id, program_type, joined_at, is_active, created_at, updated_at) FROM stdin;
d4fd7a99-f3d5-4243-8412-462b8bbe76a5	7bcda147-cbb1-43fe-8402-d87268f48d04	healing-initiatives	2026-03-04 19:22:03.951	t	2026-03-04 19:22:03.951	2026-03-04 19:22:03.951
4b068696-3af1-4c76-a0bf-58e17ad3fabb	548d9e1b-0ccd-420e-9a31-c8375ff9095e	environmental-programs	2026-03-05 05:19:54.923	t	2026-03-05 05:19:54.923	2026-03-05 05:19:54.923
\.


--
-- Fourth: Insert AuditLog (depends on User)
--

COPY public."AuditLog" (id, action, entity_type, entity_id, user_id, user_email, user_role, changes, ip_address, created_at) FROM stdin;
21b3976f-6ecb-45c1-b68e-f410e3d376d2	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@drkumarfoundation.org	super_admin	\N	127.0.0.1	2026-03-03 18:58:42.948
461b7c5e-3f2d-44de-bf4f-434f4a987d04	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-04 05:44:26.713
dfdff907-d629-4519-a6ce-1fac14ba118d	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-04 17:49:37.082
09ccc4bc-c368-4606-ae7f-a4c96f7ecf42	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-05 05:19:38.604
90cdb755-4e39-42da-8493-5b15b4b15e6d	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-08 16:17:34.564
2e4a4fa4-9517-4655-9436-552fd9ab5a98	CREATE	User	247453e5-21a0-4b4c-aea1-2a772e43349d	247453e5-21a0-4b4c-aea1-2a772e43349d	testuser@gmail.com	moderator	\N	127.0.0.1	2026-03-10 05:12:11.75
f3e09ef5-b200-446e-bed5-434f4a987d04	CREATE	User	12ff0ec7-0ce7-4164-901d-6f7dc6e47c61	12ff0ec7-0ce7-4164-901d-6f7dc6e47c61	testingusertwo@gmail.com	moderator	\N	127.0.0.1	2026-03-10 07:18:04.184
8107c351-0f7e-43f0-9df1-5dadd8ca44ea	APPROVE	User	247453e5-21a0-4b4c-aea1-2a772e43349d	247453e5-21a0-4b4c-aea1-2a772e43349d	testuser@gmail.com	moderator	\N	127.0.0.1	2026-03-10 09:05:10.585
cdf2f4df-2881-45a9-a56a-ae365bffb259	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-10 14:57:07.612
d02b3df6-f878-438c-83ba-6ff841024bae	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-10 14:58:11.553
4bd2dd58-1508-4582-8596-2d425aeb5f28	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-10 15:03:22.236
80fee2e2-501d-4da5-9d0e-1194c705a41b	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-10 15:06:51.29
f21dc618-0a3b-4dfd-9ce6-57cf6a0f610b	LOGIN	User	2cbf366a-0fe3-4fa9-9752-b10f93c75622	2cbf366a-0fe3-4fa9-9752-b10f93c75622	user2@drkumarfoundation.org	moderator	\N	127.0.0.1	2026-03-10 15:23:27.672
30c90718-22d6-4e83-a88a-55ed1470e5ab	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-10 17:33:47.646
a364001e-aa71-4887-aa2e-613c8fae695b	LOGIN	User	860afc0d-d061-4bab-9332-51338f2397fa	860afc0d-d061-4bab-9332-51338f2397fa	admin@dkf.sufisciencecenter.info	super_admin	\N	127.0.0.1	2026-03-11 04:47:48.693
\.


--
-- Fifth: Insert Contribution (depends on UserProgram)
--

COPY public."Contribution" (id, user_program_id, user_id, user_name, user_email, program_type, title, activity_date, venue_city, venue_country, participant_count, participant_phones, task_conducted, results, status, admin_comment, submitted_at, reviewed_at, reviewed_by) FROM stdin;
5358fc87-e0fe-4513-b4d6-f05c0d605e75	d4fd7a99-f3d5-4243-8412-462b8bbe76a5	7bcda147-cbb1-43fe-8402-d87268f48d04	Healing Programs Director	healing@email.com	healing-initiatives	first contribute 	2026-03-04 00:00:00	karachi	pakistan	7	+923152116859	fiufd ccucbd cdjcd cdvcv djcdvcdj	ckec  ecydukcd dcdkucbd uidcgykc wyd ddbvyd	pending	\N	2026-03-04 20:39:50.929	\N	\N
d128f37d-dbba-4eb6-909b-055e59628470	4b068696-3af1-4c76-a0bf-58e17ad3fabb	548d9e1b-0ccd-420e-9a31-c8375ff9095e	Environmental Programs Director	environment@email.com	environmental-programs	first contribution	2026-03-04 00:00:00	karachi	pakistan	4	+923475495757	knferv erhbvf vfehvbfv jefvhf v	fnvekube vfebrfvef vfbvefe vefevef v fevfb v	approved		2026-03-05 05:23:53.132	2026-03-10 15:41:37.28	860afc0d-d061-4bab-9332-51338f2397fa
\.


--
-- Sixth: Insert EngagementRequest (no dependencies)
--

COPY public."EngagementRequest" (id, program_type, form_type, payload, status, created_at, reviewed_at, reviewed_by) FROM stdin;
d9c8d8d9-e5cd-4a55-983a-b57e602b40b3	healing-initiatives	collaboration	{"fullName":"Site Administrator","professionalBackground":"I am admin ","specialization":"I am admin","country":"USA","email":"admin@dkf.sufisciencecenter.info","yearsExperience":"20","proposedContribution":"I am admin and I will manage this website . I have developed this app","consent":true}	approved	2026-03-04 04:44:24.06	2026-03-04 05:45:41.603	\N
95563df7-7e06-4b94-a9f5-0a8f22811b60	healing-initiatives	collaboration	{"fullName":"Test User One","professionalBackground":"4 years in local healing initiatives","specialization":"karachi","country":"pakistan","email":"user1@drkumarfoundation.org","yearsExperience":"4","proposedContribution":"di udbcdhc idwec hd cdiwdcd cwkdheyd cidcdcwd cdcwyecd cdjcdc  widc edited by profile","consent":true}	approved	2026-03-03 17:16:54.097	2026-03-04 17:50:11.542	\N
6392f908-b497-4143-8168-263540521d0f	healing-initiatives	collaboration	{"fullName":"Healing Programs Director","professionalBackground":"4 years in local healing initiatives","specialization":"karachi","country":"pakistan","email":"healing@email.com","yearsExperience":"4","proposedContribution":"ldjvf v vfkhbfv jfvbfh fedklfkv dhvdf vjdhvfd vf,vjhdfv dfvfhdf v fdjvhbdf ","consent":true}	approved	2026-03-04 18:50:28.102	2026-03-04 19:22:04.399	\N
700530d0-5cc9-4a72-8c18-c27603a3b01f	environmental-programs	collaboration	{"fullName":"Environmental Programs Director","institution":"karachi university","fieldOfExpertise":"web development","country":"pakistan","email":"environment@email.com","fieldExperienceYears":"3","proposedContribution":"ldjvf v vfkhbfv jfvbfh fedklfkv dhvdf vjdhvfd vf,vjhdfv dfvfhdf v fdjvhbdf ","consent":true}	approved	2026-03-05 05:18:11.663	2026-03-05 05:19:54.931	\N
6ec1f74f-1726-4c65-a4f2-2b09304fbb2c	environmental-programs	collaboration	{"fullName":"test user","institution":"lahore university","fieldOfExpertise":"web tester","country":"pakistan","email":"testuser@gmail.com","fieldExperienceYears":"2","proposedContribution":"vnrnev vevhrbvf vejfvfbv ejhbvfhvf vjfbvhfv jvfbhvhf vjfvhfhv fvhfv f jvfh vf v jfhvf vfjvhf","consent":true}	pending	2026-03-10 09:06:54.827	\N	\N
\.


--
-- Seventh: Insert FoundationGovernance (no dependencies)
--

COPY public."FoundationGovernance" (id, full_name, role_title, bio_summary, term_start, term_end, display_order, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Eighth: Insert FoundationSection (no dependencies)
--

COPY public."FoundationSection" (id, section_name, content, display_order, created_at, updated_at) FROM stdin;
\.


--
-- Ninth: Insert Gathering (no dependencies)
--

COPY public."Gathering" (id, year, location_city, location_country, description, created_at, region_name, updated_at) FROM stdin;
24f40695-5a97-4e69-bcb5-987afeb0b195	2024	Washington D.C.	United States	Circle discussion on documenting contemporary spiritual reflections.	2026-03-09 13:40:01.923	North America	2026-03-09 13:40:01.923
2126c7ed-234d-40c5-bf12-8c2f27abbc1a	2023	New York	United States	Regional gathering of seekers exploring knowledge and ethics.	2026-03-09 13:40:02.255	North America	2026-03-09 13:40:02.255
c553f44e-efc6-4172-ada2-52cbd04b3685	2022	California	United States	Small circle meeting on preserving teachings through structured archives.	2026-03-09 13:40:02.559	North America	2026-03-09 13:40:02.559
9d26ab35-566f-4638-8a68-f43d2775633b	2024	Srinagar	India	Reflection gathering with seekers reviewing archival work.	2026-03-09 13:40:02.88	South Asia	2026-03-09 13:40:02.88
add00c18-440b-4746-a466-7743dcb46394	2023	New Delhi	India	Dialogue on knowledge, spirituality, and contemporary society.	2026-03-09 13:40:03.2	South Asia	2026-03-09 13:40:03.2
9414adb1-04f0-425a-827c-22ba178fc20a	2022	Srinagar	India	Structured meeting on documentation of teachings.	2026-03-09 13:40:03.52	South Asia	2026-03-09 13:40:03.52
651d3362-f6d8-482d-9cc9-8628e50e083e	2024	Paris	France	Regional dialogue on spiritual traditions and modern inquiry.	2026-03-09 13:40:03.851	Europe	2026-03-09 13:40:03.851
762c3945-869e-43bb-bcd9-a082d1846fe2	2023	London	United Kingdom	Documented regional dialogue session.	2026-03-09 13:40:04.159	Europe	2026-03-09 13:40:04.159
e61c519f-a316-4c1a-b83a-073a501f94db	2022	Berlin	Germany	Gathering of seekers reflecting on knowledge and responsibility.	2026-03-09 13:40:04.482	Europe	2026-03-09 13:40:04.482
a58ea88e-1e55-4b71-b391-2745956b4b36	2024	Dubai	UAE	Circle discussion on spiritual knowledge and global participation.	2026-03-09 13:40:04.811	Middle East	2026-03-09 13:40:04.811
1b474c35-c570-43d3-a196-4f5f5d776032	2023	Doha	Qatar	Regional meeting of seekers and contributors.	2026-03-09 13:40:05.118	Middle East	2026-03-09 13:40:05.118
4cf90d2f-e7b1-4e83-af41-b3182357fd44	2022	Istanbul	Turkey	Dialogue on Sufi tradition and intellectual heritage.	2026-03-09 13:40:05.442	Middle East	2026-03-09 13:40:05.442
b85232f6-3b16-43a1-a49c-4da5d8b084b9	2024	Sydney	Australia	Regional gathering of seekers documenting reflections.	2026-03-09 13:40:05.776	Oceania	2026-03-09 13:40:05.776
221bc2f4-1ef3-4997-bf6f-86458fa067a4	2023	Melbourne	Australia	Discussion on preserving spiritual teachings across continents.	2026-03-09 13:40:06.082	Oceania	2026-03-09 13:40:06.082
f7e62806-5385-4497-8ba5-f9d68f23fc3a	2022	Brisbane	Australia	Circle meeting on knowledge and community engagement.	2026-03-09 13:40:06.401	Oceania	2026-03-09 13:40:06.401
0ee272f0-e255-4b09-8c0c-3f0214d1a136	2024	São Paulo	Brazil	Regional dialogue among seekers and scholars.	2026-03-09 13:40:06.721	South America	2026-03-09 13:40:06.721
adb7aff0-3f0d-4730-a72c-c013044588e6	2023	Buenos Aires	Argentina	Gathering focused on cross-cultural spiritual dialogue.	2026-03-09 13:40:07.042	South America	2026-03-09 13:40:07.042
4559b957-96a8-4700-8279-1218d4262365	2022	Santiago	Chile	Circle meeting discussing documentation of teachings.	2026-03-09 13:40:07.428	South America	2026-03-09 13:40:07.428
\.


--
-- Tenth: Insert MemberVersion (no dependencies on Member)
--

COPY public."MemberVersion" (id, member_id, full_name, country, city, profession, year_connected, first_encounter, resonated_quality, life_changes, continuing_engagement, photo_url, media_url, version_number, created_at, created_by) FROM stdin;
\.


--
-- Eleventh: Insert Notification (depends on User)
--

COPY public."Notification" (id, user_id, title, message, type, is_read, link, created_at) FROM stdin;
c37806a6-13ca-40ff-a429-b869925c238d	7bcda147-cbb1-43fe-8402-d87268f48d04	New Task Assigned	You have been assigned a new task: creating first task	task	t	/dashboard/tasks	2026-03-04 19:27:54.67
4ff125b3-3ed3-4c8a-a38b-1e7449fce78c	548d9e1b-0ccd-420e-9a31-c8375ff9095e	Contribution Approved!	Your environmental-programs contribution has been approved.	contribution	t	/dashboard/contributions	2026-03-10 15:41:41.623
700c3d53-700d-49df-a178-51977afa956c	548d9e1b-0ccd-420e-9a31-c8375ff9095e	New Task Assigned	You have been assigned a new task: creating first task	task	t	/dashboard/tasks	2026-03-05 05:21:31.691
\.


--
-- Twelfth: Insert PrinciplePage (no dependencies)
--

COPY public."PrinciplePage" (id, title, definition, context, practical_implication, selected_words, display_order, created_at, updated_at) FROM stdin;
\.


--
-- Thirteenth: Insert Quote (no dependencies)
--

COPY public."Quote" (id, text, category, is_featured, display_order, is_active, created_at, updated_at) FROM stdin;
b06e2ed9-72fa-4f5c-8b6e-36149ce977af	Faith grows quietly where compassion becomes natural.	Compassion	f	3	t	2026-03-09 11:40:35.137	2026-03-09 11:40:35.137
bb159f8a-8f6a-4dd8-abd8-58c41e46e742	Discipline is not punishment; it is the protection of the soul.	Inner Discipline	f	4	t	2026-03-09 11:40:35.493	2026-03-09 11:40:35.493
fc32fdaf-b997-4c9a-9c61-f6767618f5e7	The world changes slowly, but the heart can change in a single moment.	Self Awareness	f	5	t	2026-03-09 11:40:35.878	2026-03-09 11:40:35.878
d91e05f3-9a6f-4348-9b08-3ce4ea412ce2	Human beings search across the world for meaning, yet the doorway is always within their own awareness.	Self Awareness	t	0	t	2026-03-09 11:40:36.12	2026-03-09 11:40:36.12
754abffc-bb70-420b-bd34-31aeba3a3f0b	Compassion is not an act of will but a quality of understanding.	Compassion	f	6	t	2026-03-09 11:40:36.376	2026-03-09 11:40:36.376
f55a61b4-92d5-441d-b117-d8395142ad3c	True discipline arises from love of the goal, not fear of failure.	Inner Discipline	f	7	t	2026-03-09 11:40:36.881	2026-03-09 11:40:36.881
52f8cebf-c0f3-4565-954c-e5c79aabf4bd	Ethical conduct is not following rules but living from clarity.	Ethical Conduct	f	8	t	2026-03-09 11:40:37.128	2026-03-09 11:40:37.128
4e829e88-6f54-4f41-b72f-d49e1d07d896	We are not separate beings seeking connection; we are connection expressing as separate beings.	Human Unity	f	9	t	2026-03-09 11:40:37.38	2026-03-09 11:40:37.38
933392f2-320a-4a60-99c0-1258dcade30b	In silence, the mind finds its natural rhythm and the heart its native language.	Peace and Reflection	f	10	t	2026-03-09 11:40:37.695	2026-03-09 11:40:37.695
c64d4c02-4080-4272-b99b-68e765337b6d	Awareness is the mirror in which truth recognizes itself.	Self Awareness	f	11	t	2026-03-09 11:40:38.356	2026-03-09 11:40:38.356
c07e093e-c03d-4d57-93ac-3505d6f8d7c2	To be ethical is to act from understanding rather than from impulse.	Ethical Conduct	f	12	t	2026-03-09 11:40:38.618	2026-03-09 11:40:38.618
e344089d-245d-4fdf-a09f-0a384b9c070c	Unity is not something to achieve; it is something to recognize.	Human Unity	f	13	t	2026-03-09 11:40:38.862	2026-03-09 11:40:38.862
5d83fb09-b7f6-4adc-ad7c-f8c177a45530	Compassion begins where judgment ends.	Compassion	f	14	t	2026-03-09 11:40:39.23	2026-03-09 11:40:39.23
e3caa20d-aca1-4ffe-bf84-1cdbb440f35d	The quiet mind hears what the busy mind cannot imagine.	Peace and Reflection	f	15	t	2026-03-09 11:40:41.245	2026-03-09 11:40:41.245
54cfe4cd-08a4-44f9-9d03-019635cdb579	Self-observation is the first act of freedom.	Self Awareness	f	16	t	2026-03-09 11:40:41.574	2026-03-09 11:40:41.574
fab65000-060e-4d7e-94b2-477e90239deb	Consistency in small things creates the capacity for greatness in all things.	Inner Discipline	f	17	t	2026-03-09 11:40:41.834	2026-03-09 11:40:41.834
75186f8e-5252-4b0c-9b79-6964713b0eb4	Peace begins when the mind becomes honest with itself.	Peace and Reflection	f	2	t	2026-03-09 11:40:34.872	2026-03-09 11:43:43.407
2359ca1c-fead-4e57-8788-8e5acf6e6307	The heart becomes clear when it stops arguing with truth.	Self Awareness	f	1	t	2026-03-09 11:40:32.728	2026-03-09 11:43:44.569
\.


--
-- Fourteenth: Insert Member (depends on Region - country must exist)
-- Note: Changed Belgium to Europe region
--

COPY public."Member" (id, full_name, country, city, profession, year_connected, first_encounter, resonated_quality, life_changes, continuing_engagement, photo_url, media_url, approved, visibility_status, created_at, updated_at) FROM stdin;
f8308d70-202f-4033-8730-ebd2bed0ff6d	Youth Engagement Director	Europe	\N	Engineer	2019	gf ksfrbe rverjbvhrv e ejrveld vhfrevkrf vhjvve chjerveke rvhf vkgf ve,hvf evfvhfr kehg fvfgev fgve fkhevk fgv dhceghc vdb cfv	Inner_Discipline	erkvtr vdjrvke vvdvgfv d,v fmg vdf ,fhvgfv, rheukf wefrv ehfrev ef hrfvv efvhfvere v	jbshrfbrkfd cjhvcgfrv dcbjdgv,cjdf v, hvgrfvv dfvegf ve dc gfev  d gfevghdcdjd gfvegdd e	\N	\N	t	published	2026-03-11 05:47:43.5	2026-03-11 05:48:24.699
\.


--
-- Fifteenth: Insert Registration (depends on Region - country must exist)
-- Note: Changed China to South Asia region
--

COPY public."Registration" (id, full_name, country, profession, year_connected, first_encounter, resonated_quality, life_changes, continuing_engagement, consent_accepted, review_status, reviewed_by, reviewed_at, created_at) FROM stdin;
c967c18a-f4f3-4a25-a0e5-5f9d1616afe9	Test User One	South Asia	Educator	2020	jdjkcjdn fj,kdfnk ldfvfj.vk dflfjv dflvjdf vdfjv f vf.vhf vdf.vkdfjlfvnf fvnfv dfkvdfjkv .fjf vfjk changed by profile	Inner_Discipline	jvndfv fvldfvh,df dvdfkbvh,f dv.fkdbvfvd vnfjk.v,h d dkf,vh fvd vjkdf,vbfh v dkv,dfhb,vf dvkfjkdb,vf,d ,vkfhv	d,kbfcv fkvfkvdf,d vdfkvkbhfdkv,f vk,dfhvf .dkfj,v,d vdfbvfhdk.d vfdjbvfhvd, fvfk,vjhfdd fvjkdfbv fd	t	pending	\N	\N	2026-03-03 17:35:11.288
a37c6cce-58de-4ed4-8de8-bdb51a6faef4	test user	South Asia	Artist	2020	yky yuvlj,n lvhkg,k kcvj,.nkv k.vhcg.k k.cgj k.cgj kckfhb,j	Self_Awareness	hj,jkn jkb.hjk b,jhvj,b  jhchcg fnvjb gmcmhjj jgc,hj cmfhmj jgcgmjn 	jcgh, jhcg,,j jh,jkk,vh jh,cghkjn v,jbhvgcgcgvh hvhmhjhvcbhvgmhmv	t	pending	\N	\N	2026-03-10 09:28:14.573
f5d06078-fed9-4702-ac08-2b1f6fe17f47	Youth Engagement Director	Europe	Engineer	2019	gf ksfrbe rverjbvhrv e ejrveld vhfrevkrf vhjvve chjerveke rvhf vkgf ve,hvf evfvhfr kehg fvfgev fgve fkhevk fgv dhceghc vdb cfv	Inner_Discipline	erkvtr vdjrvke vvdvgfv d,v fmg vdf ,fhvgfv, rheukf wefrv ehfrev ef hrfvv efvhfvere v	jbshrfbrkfd cjhvcgfrv dcbjdgv,cjdf v, hvgrfvv dfvegf ve dc gfev  d gfevghdcdjd gfvegdd e	t	approved	admin-user-id	2026-03-11 05:47:43.51	2026-03-10 11:32:06.554
\.


--
-- Sixteenth: Insert Task (depends on UserProgram)
--

COPY public."Task" (id, user_program_id, user_id, user_name, user_email, program_type, title, message, status, created_at, due_date, completed_at) FROM stdin;
988f9875-a2db-41da-8362-e4ebe0cda39d	d4fd7a99-f3d5-4243-8412-462b8bbe76a5	7bcda147-cbb1-43fe-8402-d87268f48d04	Healing Programs Director	healing@email.com	healing-initiatives	creating first task	creating first task	pending	2026-03-04 19:27:52.514	2026-03-05 00:00:00	\N
7531d98f-13c2-42c6-97d1-4df84dd90f9a	4b068696-3af1-4c76-a0bf-58e17ad3fabb	548d9e1b-0ccd-420e-9a31-c8375ff9095e	Environmental Programs Director	environment@email.com	environmental-programs	creating first task	creating first task	pending	2026-03-05 05:21:31.665	2026-03-05 00:00:00	\N
\.


--
-- End of data import
--
