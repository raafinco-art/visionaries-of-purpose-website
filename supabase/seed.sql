-- ============================================================================
-- Content seed, generated from data/fallback-content.json.
--
-- Do not edit by hand. Change the JSON and run `node scripts/build-seed.mjs`.
--
-- Every statement is an upsert keyed on slug, so applying this repeatedly is
-- safe. Values absent from the source are seeded as NULL rather than guessed.
-- Source last reviewed: 2026-08-05
-- ============================================================================

begin;

-- Artists ------------------------------------------------------------------
insert into public.artists (slug, name, legal_name, role, short_bio, long_bio, portrait_path, portrait_alt, social_links, display_order, is_published) values (
  'tshepiso-sk', 'Tshepiso SK', 'Tshepiso Sekhonde', 'Singer · Worshiper · Composer',
  'A singer, worshiper and composer whose life is rooted in faith, purpose and service.', ARRAY['Tshepiso Sekhonde, better known as Tshepiso SK, is a singer, worshiper and composer whose life is deeply rooted in faith, purpose and service. A professional hygienist, philanthropist and community driven individual, she carries the same spirit of care into every space she enters.', 'As a Visionary of Purpose, Tshepiso SK believes that music is more than a gift. It is a vessel for healing, hope and transformation. Her voice, compassion and commitment to people reflect a woman determined to use every part of her life to create meaningful impact.']::text[],
  'assets/images/artists/tshepiso-sk-portrait', 'Tshepiso SK, singer, worshiper and composer with Visionaries of Purpose.',
  '[{"platform":"TikTok","url":"https://www.tiktok.com/@tshepiso_sk_music"},{"platform":"Instagram","url":"https://www.instagram.com/tshepisoskhonde/"},{"platform":"Facebook","url":"https://www.facebook.com/p/Tshepiso-SK-100064151199717/"}]'::jsonb, 1, true
) on conflict (slug) do update set
  name = excluded.name, legal_name = excluded.legal_name, role = excluded.role,
  short_bio = excluded.short_bio, long_bio = excluded.long_bio,
  portrait_path = excluded.portrait_path, portrait_alt = excluded.portrait_alt,
  social_links = excluded.social_links, display_order = excluded.display_order,
  is_published = excluded.is_published;

insert into public.artists (slug, name, legal_name, role, short_bio, long_bio, portrait_path, portrait_alt, social_links, display_order, is_published) values (
  'tetelo-m', 'Tetelo M', NULL, 'Artist · Worshiper · Songwriter',
  'An artist and worshiper whose voice carries faith, purpose and a conviction to reveal the heart of God.', ARRAY['Tetelo M is an artist, worshiper, songwriter and composer whose voice carries more than melody. It carries faith, purpose and a deep conviction to reveal the heart of God through music.', 'Blessed with a powerful and distinctive voice, she creates from a place of worship, allowing every lyric and every note to become an expression of hope, healing and divine truth. Her music encourages people to rise above fear, rediscover their God-given identity and walk boldly in the purpose placed within them.', 'Tetelo M believes that worship has the power to transform atmospheres, restore hearts and awaken faith. Through her gift, she reminds every listener that their story is not finished, their purpose is still alive and God remains faithful through every season.', 'She is not simply singing songs. She is building moments of encounter, carrying a message of courage and empowering a generation to believe, worship and move forward with confidence.']::text[],
  'assets/images/artists/tetelo-m-portrait', 'Tetelo M, artist, worshiper and songwriter with Visionaries of Purpose.',
  '[{"platform":"TikTok","url":"https://www.tiktok.com/@tetelom64"},{"platform":"Instagram","url":"https://www.instagram.com/tetelo_.m/"},{"platform":"Facebook","url":"https://www.facebook.com/tetelo.mathuthu.7"}]'::jsonb, 2, true
) on conflict (slug) do update set
  name = excluded.name, legal_name = excluded.legal_name, role = excluded.role,
  short_bio = excluded.short_bio, long_bio = excluded.long_bio,
  portrait_path = excluded.portrait_path, portrait_alt = excluded.portrait_alt,
  social_links = excluded.social_links, display_order = excluded.display_order,
  is_published = excluded.is_published;

insert into public.artists (slug, name, legal_name, role, short_bio, long_bio, portrait_path, portrait_alt, social_links, display_order, is_published) values (
  'divine-oracle', 'Divine Oracle', 'Divine Jonasi', 'Preacher · Worshipper',
  'A preacher and worshipper whose ministry is shaped by faith, purpose and a desire to reveal the heart of God.', ARRAY['Divine Oracle, born Divine Jonasi, is a visionary preacher and worshipper whose ministry is shaped by faith, purpose and a deep desire to reveal the heart of God.', 'As part of Visionaries of Purpose, he carries a forward-looking approach to ministry, using both the Word and worship to awaken faith, inspire spiritual growth and lead people into meaningful encounters with God. His calling is not only to minister for the moment, but to help shape a generation that sees beyond the present and lives with divine purpose.']::text[],
  'assets/images/artists/divine-oracle-portrait', 'Divine Oracle, preacher and worshipper with Visionaries of Purpose.',
  '[]'::jsonb, 3, true
) on conflict (slug) do update set
  name = excluded.name, legal_name = excluded.legal_name, role = excluded.role,
  short_bio = excluded.short_bio, long_bio = excluded.long_bio,
  portrait_path = excluded.portrait_path, portrait_alt = excluded.portrait_alt,
  social_links = excluded.social_links, display_order = excluded.display_order,
  is_published = excluded.is_published;

-- Events -------------------------------------------------------------------
insert into public.events (slug, title, theme, event_type, host, organisers, artist_names,
  event_date, is_all_day, end_time_label, venue, city, description, long_description,
  admission, entrance_requirements, scripture, enquiry_numbers, poster_path, poster_alt,
  ticket_url, ticket_provider, prices, maps_url, is_published) values (
  'my-hope-conference-2026', 'My Hope Conference 2026', 'Jesus, the Light of Hope', 'Conference', 'Shekinah Christian Worship Centre',
  '{}', ARRAY['Minister Tshepiso SK']::text[],
  '2026-08-09', false, NULL,
  'Shekinah Christian Worship Centre', 'Tubatse',
  'Shekinah Christian Worship Centre presents My Hope Conference 2026, a day of worship, ministry and spiritual renewal featuring Minister Tshepiso SK.', ARRAY['Hope is not simply something we wait for. Hope has a name, and that name is Jesus.', 'Join Shekinah Christian Worship Centre for My Hope Conference 2026, a powerful gathering created to direct hearts back to the true and lasting light of Christ. Believers will gather in Tubatse for a full day of worship, ministry and spiritual renewal across a morning and an evening session, creating space for the Word, prayer, fellowship and worship.', 'As the featured guest artist, Minister Tshepiso SK will bring her worship ministry into an atmosphere prepared for encounter.']::text[],
  'Registration is online and free.', '{}', 'John 8:12',
  '{}',
  'assets/images/events/my-hope-conference-2026-poster', 'My Hope Conference 2026 poster in green and gold, showing guest artist Minister Tshepiso SK.',
  NULL, NULL, '[]'::jsonb, NULL,
  true
) on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, event_type = excluded.event_type,
  host = excluded.host, organisers = excluded.organisers, artist_names = excluded.artist_names,
  event_date = excluded.event_date, is_all_day = excluded.is_all_day,
  end_time_label = excluded.end_time_label, venue = excluded.venue, city = excluded.city,
  description = excluded.description, long_description = excluded.long_description,
  admission = excluded.admission, entrance_requirements = excluded.entrance_requirements,
  scripture = excluded.scripture, enquiry_numbers = excluded.enquiry_numbers,
  poster_path = excluded.poster_path, poster_alt = excluded.poster_alt,
  ticket_url = excluded.ticket_url, ticket_provider = excluded.ticket_provider,
  prices = excluded.prices, maps_url = excluded.maps_url,
  is_published = excluded.is_published;

delete from public.event_sessions where event_id = (select id from public.events where slug = 'my-hope-conference-2026');
insert into public.event_sessions (event_id, label, starts_at, ends_at, display_order)
  select id, 'Morning session', '2026-08-09T08:00:00+02:00'::timestamptz, NULL, 0
  from public.events where slug = 'my-hope-conference-2026';
insert into public.event_sessions (event_id, label, starts_at, ends_at, display_order)
  select id, 'Evening session', '2026-08-09T17:30:00+02:00'::timestamptz, NULL, 1
  from public.events where slug = 'my-hope-conference-2026';

insert into public.events (slug, title, theme, event_type, host, organisers, artist_names,
  event_date, is_all_day, end_time_label, venue, city, description, long_description,
  admission, entrance_requirements, scripture, enquiry_numbers, poster_path, poster_alt,
  ticket_url, ticket_provider, prices, maps_url, is_published) values (
  'tetelo-m-worship-night-venda', 'Worship Night', NULL, 'Worship night', NULL,
  '{}', ARRAY['Tetelo M']::text[],
  '2026-08-24', true, NULL,
  NULL, 'Venda',
  'Join Tetelo M for a Worship Night in Venda on 24 August 2026.', ARRAY['Join Tetelo M for a Worship Night in Venda.']::text[],
  NULL, '{}', NULL,
  '{}',
  'assets/images/events/tetelo-m-worship-night-venda-poster', 'Tetelo M Worship Night poster for the Venda date on 24 August 2026.',
  NULL, NULL, '[]'::jsonb, NULL,
  true
) on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, event_type = excluded.event_type,
  host = excluded.host, organisers = excluded.organisers, artist_names = excluded.artist_names,
  event_date = excluded.event_date, is_all_day = excluded.is_all_day,
  end_time_label = excluded.end_time_label, venue = excluded.venue, city = excluded.city,
  description = excluded.description, long_description = excluded.long_description,
  admission = excluded.admission, entrance_requirements = excluded.entrance_requirements,
  scripture = excluded.scripture, enquiry_numbers = excluded.enquiry_numbers,
  poster_path = excluded.poster_path, poster_alt = excluded.poster_alt,
  ticket_url = excluded.ticket_url, ticket_provider = excluded.ticket_provider,
  prices = excluded.prices, maps_url = excluded.maps_url,
  is_published = excluded.is_published;

delete from public.event_sessions where event_id = (select id from public.events where slug = 'tetelo-m-worship-night-venda');

insert into public.events (slug, title, theme, event_type, host, organisers, artist_names,
  event_date, is_all_day, end_time_label, venue, city, description, long_description,
  admission, entrance_requirements, scripture, enquiry_numbers, poster_path, poster_alt,
  ticket_url, ticket_provider, prices, maps_url, is_published) values (
  'tshepiso-sk-worship-night-burgersfort', 'Worship Night', NULL, 'Worship night', NULL,
  '{}', ARRAY['Tshepiso SK']::text[],
  '2026-09-26', true, NULL,
  NULL, 'Burgersfort',
  'Join Tshepiso SK for a special Worship Night in Burgersfort on 26 September 2026.', ARRAY['Join Tshepiso SK for a special night of worship, prayer and God-breathed song. Come expectant for a gathering filled with presence, ministry and sound that ministers to the heart.']::text[],
  NULL, '{}', NULL,
  '{}',
  'assets/images/events/tshepiso-sk-worship-night-burgersfort-poster', 'Tshepiso SK Worship Night poster for 26 September 2026 in Burgersfort.',
  NULL, NULL, '[]'::jsonb, NULL,
  true
) on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, event_type = excluded.event_type,
  host = excluded.host, organisers = excluded.organisers, artist_names = excluded.artist_names,
  event_date = excluded.event_date, is_all_day = excluded.is_all_day,
  end_time_label = excluded.end_time_label, venue = excluded.venue, city = excluded.city,
  description = excluded.description, long_description = excluded.long_description,
  admission = excluded.admission, entrance_requirements = excluded.entrance_requirements,
  scripture = excluded.scripture, enquiry_numbers = excluded.enquiry_numbers,
  poster_path = excluded.poster_path, poster_alt = excluded.poster_alt,
  ticket_url = excluded.ticket_url, ticket_provider = excluded.ticket_provider,
  prices = excluded.prices, maps_url = excluded.maps_url,
  is_published = excluded.is_published;

delete from public.event_sessions where event_id = (select id from public.events where slug = 'tshepiso-sk-worship-night-burgersfort');

insert into public.events (slug, title, theme, event_type, host, organisers, artist_names,
  event_date, is_all_day, end_time_label, venue, city, description, long_description,
  admission, entrance_requirements, scripture, enquiry_numbers, poster_path, poster_alt,
  ticket_url, ticket_provider, prices, maps_url, is_published) values (
  'grace-renewed-live-recording', 'Grace Renewed Live Recording', NULL, 'Live recording', NULL,
  '{}', ARRAY['Tshepiso SK']::text[],
  '2026-11-14', true, NULL,
  NULL, 'Burgersfort',
  'Be part of Grace Renewed, a live recording experience with Tshepiso SK in Burgersfort on 14 November 2026.', ARRAY['Be part of a powerful live recording with Tshepiso SK. Come ready for worship, encounter, and a sound of renewal that will fill the room with faith, presence and grace.']::text[],
  NULL, '{}', NULL,
  '{}',
  'assets/images/events/grace-renewed-live-recording-poster', 'Grace Renewed Live Recording poster featuring Tshepiso SK, 14 November 2026 in Burgersfort.',
  'https://computicket-boxoffice.com/e/grace-renewed-IxJviO', 'Computicket Box Office', '[]'::jsonb, NULL,
  true
) on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, event_type = excluded.event_type,
  host = excluded.host, organisers = excluded.organisers, artist_names = excluded.artist_names,
  event_date = excluded.event_date, is_all_day = excluded.is_all_day,
  end_time_label = excluded.end_time_label, venue = excluded.venue, city = excluded.city,
  description = excluded.description, long_description = excluded.long_description,
  admission = excluded.admission, entrance_requirements = excluded.entrance_requirements,
  scripture = excluded.scripture, enquiry_numbers = excluded.enquiry_numbers,
  poster_path = excluded.poster_path, poster_alt = excluded.poster_alt,
  ticket_url = excluded.ticket_url, ticket_provider = excluded.ticket_provider,
  prices = excluded.prices, maps_url = excluded.maps_url,
  is_published = excluded.is_published;

delete from public.event_sessions where event_id = (select id from public.events where slug = 'grace-renewed-live-recording');

insert into public.events (slug, title, theme, event_type, host, organisers, artist_names,
  event_date, is_all_day, end_time_label, venue, city, description, long_description,
  admission, entrance_requirements, scripture, enquiry_numbers, poster_path, poster_alt,
  ticket_url, ticket_provider, prices, maps_url, is_published) values (
  'tetelo-m-gospel-concert-rustenburg', 'Gospel Concert', NULL, 'Gospel concert', NULL,
  '{}', ARRAY['Tetelo M']::text[],
  '2026-11-28', true, NULL,
  NULL, 'Rustenburg',
  'See Tetelo M at the Gospel Concert in Rustenburg on 28 November 2026.', ARRAY['An unforgettable night of gospel music awaits in Rustenburg. Come and experience Tetelo M live as she ministers in song with warmth, joy and worship. Gather your loved ones and join us for an evening that will leave hearts refreshed.']::text[],
  NULL, '{}', NULL,
  '{}',
  'assets/images/events/tetelo-m-gospel-concert-rustenburg-poster', 'Tetelo M Gospel Concert poster in cream and gold for 28 November 2026 in Rustenburg.',
  NULL, NULL, '[]'::jsonb, NULL,
  true
) on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, event_type = excluded.event_type,
  host = excluded.host, organisers = excluded.organisers, artist_names = excluded.artist_names,
  event_date = excluded.event_date, is_all_day = excluded.is_all_day,
  end_time_label = excluded.end_time_label, venue = excluded.venue, city = excluded.city,
  description = excluded.description, long_description = excluded.long_description,
  admission = excluded.admission, entrance_requirements = excluded.entrance_requirements,
  scripture = excluded.scripture, enquiry_numbers = excluded.enquiry_numbers,
  poster_path = excluded.poster_path, poster_alt = excluded.poster_alt,
  ticket_url = excluded.ticket_url, ticket_provider = excluded.ticket_provider,
  prices = excluded.prices, maps_url = excluded.maps_url,
  is_published = excluded.is_published;

delete from public.event_sessions where event_id = (select id from public.events where slug = 'tetelo-m-gospel-concert-rustenburg');

insert into public.events (slug, title, theme, event_type, host, organisers, artist_names,
  event_date, is_all_day, end_time_label, venue, city, description, long_description,
  admission, entrance_requirements, scripture, enquiry_numbers, poster_path, poster_alt,
  ticket_url, ticket_provider, prices, maps_url, is_published) values (
  'tetelo-m-21st-celebration-burgersfort', '21st Celebration', NULL, 'Celebration', NULL,
  '{}', ARRAY['Tetelo M']::text[],
  '2026-12-23', true, NULL,
  NULL, 'Burgersfort',
  'Join Tetelo M for the 21st Celebration in Burgersfort on 23 December 2026.', ARRAY['Join Tetelo M for the 21st Celebration in Burgersfort.']::text[],
  NULL, '{}', NULL,
  '{}',
  'assets/images/events/tetelo-m-21st-celebration-burgersfort-poster', 'Tetelo M 21st Celebration poster for 23 December 2026 in Burgersfort.',
  NULL, NULL, '[]'::jsonb, NULL,
  true
) on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, event_type = excluded.event_type,
  host = excluded.host, organisers = excluded.organisers, artist_names = excluded.artist_names,
  event_date = excluded.event_date, is_all_day = excluded.is_all_day,
  end_time_label = excluded.end_time_label, venue = excluded.venue, city = excluded.city,
  description = excluded.description, long_description = excluded.long_description,
  admission = excluded.admission, entrance_requirements = excluded.entrance_requirements,
  scripture = excluded.scripture, enquiry_numbers = excluded.enquiry_numbers,
  poster_path = excluded.poster_path, poster_alt = excluded.poster_alt,
  ticket_url = excluded.ticket_url, ticket_provider = excluded.ticket_provider,
  prices = excluded.prices, maps_url = excluded.maps_url,
  is_published = excluded.is_published;

delete from public.event_sessions where event_id = (select id from public.events where slug = 'tetelo-m-21st-celebration-burgersfort');

insert into public.events (slug, title, theme, event_type, host, organisers, artist_names,
  event_date, is_all_day, end_time_label, venue, city, description, long_description,
  admission, entrance_requirements, scripture, enquiry_numbers, poster_path, poster_alt,
  ticket_url, ticket_provider, prices, maps_url, is_published) values (
  'tetelo-m-gospel-festival-polokwane', 'Gospel Festival', NULL, 'Gospel festival', NULL,
  '{}', ARRAY['Tetelo M']::text[],
  '2026-12-28', true, NULL,
  NULL, 'Polokwane',
  'See Tetelo M at the Gospel Festival in Polokwane on 28 December 2026.', ARRAY['Come celebrate at the Gospel Festival in Polokwane with Tetelo M. Expect a vibrant time of worship, uplifting music and a powerful end-of-year gathering with people who love the presence of God.']::text[],
  NULL, '{}', NULL,
  '{}',
  'assets/images/events/tetelo-m-gospel-festival-polokwane-poster', 'Tetelo M Gospel Festival poster in cream and gold for 28 December 2026 in Polokwane.',
  NULL, NULL, '[]'::jsonb, NULL,
  true
) on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, event_type = excluded.event_type,
  host = excluded.host, organisers = excluded.organisers, artist_names = excluded.artist_names,
  event_date = excluded.event_date, is_all_day = excluded.is_all_day,
  end_time_label = excluded.end_time_label, venue = excluded.venue, city = excluded.city,
  description = excluded.description, long_description = excluded.long_description,
  admission = excluded.admission, entrance_requirements = excluded.entrance_requirements,
  scripture = excluded.scripture, enquiry_numbers = excluded.enquiry_numbers,
  poster_path = excluded.poster_path, poster_alt = excluded.poster_alt,
  ticket_url = excluded.ticket_url, ticket_provider = excluded.ticket_provider,
  prices = excluded.prices, maps_url = excluded.maps_url,
  is_published = excluded.is_published;

delete from public.event_sessions where event_id = (select id from public.events where slug = 'tetelo-m-gospel-festival-polokwane');

-- Music releases -----------------------------------------------------------
insert into public.music_releases (slug, title, artist_display, artist_id, release_type,
  cover_path, cover_alt, spotify_track_id, apple_song_id, platform_links, is_latest,
  display_order, is_published) values (
  'my-life-depends-on-you-lord', 'My Life Depends on You Lord', 'Tetelo M',
  (select id from public.artists where slug = 'tetelo-m'),
  'Single', 'assets/images/music/my-life-depends-on-you-lord-cover', 'Cover artwork for My Life Depends on You Lord by Tetelo M.',
  '0Fj2RPVTrqE5e1wOq8ZeK6', NULL, '[{"platform":"Spotify","url":"https://open.spotify.com/track/0Fj2RPVTrqE5e1wOq8ZeK6"},{"platform":"Apple Music","url":"https://music.apple.com/us/album/my-life-depends-on-you-lord-single/6783933798"}]'::jsonb,
  true, 1, true
) on conflict (slug) do update set
  title = excluded.title, artist_display = excluded.artist_display,
  artist_id = excluded.artist_id, release_type = excluded.release_type,
  cover_path = excluded.cover_path, cover_alt = excluded.cover_alt,
  spotify_track_id = excluded.spotify_track_id, apple_song_id = excluded.apple_song_id,
  platform_links = excluded.platform_links, is_latest = excluded.is_latest,
  display_order = excluded.display_order, is_published = excluded.is_published;

insert into public.music_releases (slug, title, artist_display, artist_id, release_type,
  cover_path, cover_alt, spotify_track_id, apple_song_id, platform_links, is_latest,
  display_order, is_published) values (
  'at-the-mention-of-your-name', 'At the Mention of Your Name', 'Tetelo M',
  (select id from public.artists where slug = 'tetelo-m'),
  'Single', 'assets/images/music/at-the-mention-of-your-name-cover', 'Cover artwork for At the Mention of Your Name by Tetelo M.',
  '5BovwhyvEonfPOtVXDeqba', NULL, '[{"platform":"Spotify","url":"https://open.spotify.com/track/5BovwhyvEonfPOtVXDeqba"}]'::jsonb,
  false, 2, true
) on conflict (slug) do update set
  title = excluded.title, artist_display = excluded.artist_display,
  artist_id = excluded.artist_id, release_type = excluded.release_type,
  cover_path = excluded.cover_path, cover_alt = excluded.cover_alt,
  spotify_track_id = excluded.spotify_track_id, apple_song_id = excluded.apple_song_id,
  platform_links = excluded.platform_links, is_latest = excluded.is_latest,
  display_order = excluded.display_order, is_published = excluded.is_published;

insert into public.music_releases (slug, title, artist_display, artist_id, release_type,
  cover_path, cover_alt, spotify_track_id, apple_song_id, platform_links, is_latest,
  display_order, is_published) values (
  'matthew-7-7-kokota', 'Matthew 7:7 Kokota', 'Tetelo M ft Given Mohlala',
  (select id from public.artists where slug = 'tetelo-m'),
  'Single', 'assets/images/music/matthew-7-7-kokota-cover', 'Cover artwork for Matthew 7:7 Kokota by Tetelo M featuring Given Mohlala.',
  '5SKeF33IiyqqI1zoPZRdaA', NULL, '[{"platform":"Spotify","url":"https://open.spotify.com/track/5SKeF33IiyqqI1zoPZRdaA"}]'::jsonb,
  false, 3, true
) on conflict (slug) do update set
  title = excluded.title, artist_display = excluded.artist_display,
  artist_id = excluded.artist_id, release_type = excluded.release_type,
  cover_path = excluded.cover_path, cover_alt = excluded.cover_alt,
  spotify_track_id = excluded.spotify_track_id, apple_song_id = excluded.apple_song_id,
  platform_links = excluded.platform_links, is_latest = excluded.is_latest,
  display_order = excluded.display_order, is_published = excluded.is_published;

insert into public.music_releases (slug, title, artist_display, artist_id, release_type,
  cover_path, cover_alt, spotify_track_id, apple_song_id, platform_links, is_latest,
  display_order, is_published) values (
  'buwa', 'Buwa', 'Tetelo M',
  (select id from public.artists where slug = 'tetelo-m'),
  'Single', 'assets/images/music/buwa-cover', 'Cover artwork for Buwa by Tetelo M.',
  '3mof2hYc48J3WlevEQ7sFS', NULL, '[{"platform":"Spotify","url":"https://open.spotify.com/track/3mof2hYc48J3WlevEQ7sFS"}]'::jsonb,
  false, 4, true
) on conflict (slug) do update set
  title = excluded.title, artist_display = excluded.artist_display,
  artist_id = excluded.artist_id, release_type = excluded.release_type,
  cover_path = excluded.cover_path, cover_alt = excluded.cover_alt,
  spotify_track_id = excluded.spotify_track_id, apple_song_id = excluded.apple_song_id,
  platform_links = excluded.platform_links, is_latest = excluded.is_latest,
  display_order = excluded.display_order, is_published = excluded.is_published;

insert into public.music_releases (slug, title, artist_display, artist_id, release_type,
  cover_path, cover_alt, spotify_track_id, apple_song_id, platform_links, is_latest,
  display_order, is_published) values (
  'phenyo', 'Phenyo', 'Sonto & Tshepiso',
  (select id from public.artists where slug = 'tshepiso-sk'),
  'Single', 'assets/images/music/ngcwele-phenyo-cover', 'Cover artwork for the Ngcwele and Phenyo release by Sonto and Tshepiso.',
  '0A20P9vmf6gMa0GC5BUiS0', NULL, '[{"platform":"Spotify","url":"https://open.spotify.com/track/0A20P9vmf6gMa0GC5BUiS0"}]'::jsonb,
  false, 5, true
) on conflict (slug) do update set
  title = excluded.title, artist_display = excluded.artist_display,
  artist_id = excluded.artist_id, release_type = excluded.release_type,
  cover_path = excluded.cover_path, cover_alt = excluded.cover_alt,
  spotify_track_id = excluded.spotify_track_id, apple_song_id = excluded.apple_song_id,
  platform_links = excluded.platform_links, is_latest = excluded.is_latest,
  display_order = excluded.display_order, is_published = excluded.is_published;

insert into public.music_releases (slug, title, artist_display, artist_id, release_type,
  cover_path, cover_alt, spotify_track_id, apple_song_id, platform_links, is_latest,
  display_order, is_published) values (
  'ngcwele', 'Ngcwele', 'Sonto & Tshepiso',
  (select id from public.artists where slug = 'tshepiso-sk'),
  'Single', 'assets/images/music/ngcwele-phenyo-cover', 'Cover artwork for the Ngcwele and Phenyo release by Sonto and Tshepiso.',
  '5zMoA6T7ZIkLamCfhBM4H2', NULL, '[{"platform":"Spotify","url":"https://open.spotify.com/track/5zMoA6T7ZIkLamCfhBM4H2"}]'::jsonb,
  false, 6, true
) on conflict (slug) do update set
  title = excluded.title, artist_display = excluded.artist_display,
  artist_id = excluded.artist_id, release_type = excluded.release_type,
  cover_path = excluded.cover_path, cover_alt = excluded.cover_alt,
  spotify_track_id = excluded.spotify_track_id, apple_song_id = excluded.apple_song_id,
  platform_links = excluded.platform_links, is_latest = excluded.is_latest,
  display_order = excluded.display_order, is_published = excluded.is_published;

-- News --------------------------------------------------------------------
-- The outreach story has no supplied publication date, and the table requires
-- one before a row may be published. It is seeded as a draft on purpose; set
-- published_at and is_published once the owner confirms the date.

insert into public.news_posts (slug, title, category, excerpt, lead_image_path,
  lead_image_alt, published_at, is_published) values (
  'tshepiso-sk-community-outreach', 'Where dignity found its feet: Tshepiso SK brings shoes, sanitary pads and hope to a local primary school', 'Community impact', 'Tshepiso SK brought compassion into action through a successful school shoes and sanitary pads outreach at a local primary school, affirming the dignity, confidence and potential of every learner reached.',
  'assets/images/news/tshepiso-sk-outreach-lead', 'Representatives presenting donated school shoes and sanitary pads with learners gathered behind them.', NULL, false
) on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt,
  lead_image_path = excluded.lead_image_path, lead_image_alt = excluded.lead_image_alt;

commit;
