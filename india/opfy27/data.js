// Sobha FY27E Business Plan — shared data (Rs. Mn unless noted)

window.SOBHA = {
  // ---------- City-wise sales (Page 7-8) ----------
  citySales: [
    {city:'Bangalore', fy27:86595, share27:77616, fy26:44780, share26:38260, fy25:36425, fy24:43930, fy23:32980, q1:14639, q2:17934, q3:18024, q4:35998, growth:93.4, cagr:27.3, units:4007, sba:6651857, real:13018, ongo:24963, newL:61632},
    {city:'Gurgaon', fy27:42864, share27:24508, fy26:10099, share26:6039, fy25:12491, fy24:8300, fy23:10553, q1:14137, q2:6255, q3:10859, q4:11613, growth:324.4, cagr:42.0, units:700, sba:1754581, real:24430, ongo:18827, newL:24037},
    {city:'Greater Noida', fy27:14678, share27:9933, fy26:14450, share26:13080, fy25:0, fy24:0, fy23:0, q1:1746, q2:1384, q3:1353, q4:10196, growth:1.6, cagr:1.58, units:514, sba:967102, real:15178, ongo:14678, newL:0},
    {city:'Cochin', fy27:5834, share27:3581, fy26:4401, share26:2662, fy25:4664, fy24:6781, fy23:2388, q1:889, q2:1635, q3:1635, q4:1674, growth:32.6, cagr:25.0, units:184, sba:443555, real:13152, ongo:5834, newL:0},
    {city:'Thrissur', fy27:2415, share27:2415, fy26:2227, share26:2227, fy25:2176, fy24:1283, fy23:1079, q1:510, q2:685, q3:624, q4:596, growth:8.4, cagr:22.3, units:88, sba:211766, real:11402, ongo:1152, newL:1262},
    {city:'Trivandrum', fy27:1780, share27:1780, fy26:1457, share26:1457, fy25:1403, fy24:979, fy23:968, q1:440, q2:440, q3:446, q4:455, growth:22.2, cagr:16.5, units:60, sba:135700, real:13119, ongo:1780, newL:0},
    {city:'Calicut', fy27:1800, share27:1399, fy26:-9, share26:-9, fy25:133, fy24:536, fy23:-666, q1:34, q2:720, q3:523, q4:523, growth:0, cagr:0, units:55, sba:159472, real:11286, ongo:171, newL:1629},
    {city:'Chennai', fy27:2246, share27:2205, fy26:1076, share26:646, fy25:1317, fy24:961, fy23:579, q1:91, q2:714, q3:760, q4:681, growth:108.7, cagr:40.3, units:98, sba:158172, real:14202, ongo:228, newL:2018},
    {city:'Coimbatore', fy27:0, share27:0, fy26:123, share26:123, fy25:383, fy24:21, fy23:363, q1:0, q2:0, q3:0, q4:0, growth:-100, cagr:-100, units:0, sba:0, real:0, ongo:0, newL:0},
    {city:'GIFT City', fy27:1911, share27:1911, fy26:1304, share26:1304, fy25:1707, fy24:2196, fy23:1575, q1:478, q2:478, q3:478, q4:478, growth:46.6, cagr:5.0, units:72, sba:156295, real:12228, ongo:1911, newL:0},
    {city:'Hyderabad', fy27:6158, share27:5032, fy26:620, share26:608, fy25:1245, fy24:1036, fy23:1452, q1:175, q2:175, q3:1547, q4:4261, growth:893.9, cagr:43.5, units:212, sba:452142, real:13621, ongo:537, newL:5621},
    {city:'Pune', fy27:1683, share27:1590, fy26:374, share26:318, fy25:822, fy24:425, fy23:706, q1:348, q2:313, q3:313, q4:709, growth:350.2, cagr:24.3, units:58, sba:128828, real:13065, ongo:1288, newL:395},
    {city:'Mumbai', fy27:5433, share27:4471, fy26:458, share26:348, fy25:0, fy24:0, fy23:0, q1:755, q2:1047, q3:1125, q4:2506, growth:1087.1, cagr:1087.1, units:116, sba:104050, real:52212, ongo:1863, newL:3570}
  ],
  // PAN India sales aggregated FY23-27E (Total incl. Mfg/Contracts/Comm)
  trend: {
    re: [{y:'FY23', v:51977}, {y:'FY24', v:66448}, {y:'FY25', v:62765}, {y:'FY26A', v:81359}, {y:'FY27E', v:173397}],
    total: [{y:'FY23', v:59908}, {y:'FY24', v:74169}, {y:'FY25', v:69372}, {y:'FY26A', v:88738}, {y:'FY27E', v:181129}],
    launches: [{y:'FY23', v:3.96}, {y:'FY24', v:7.02}, {y:'FY25', v:8.76}, {y:'FY26A', v:6.04}, {y:'FY27E', v:22.97}],
    completions: [{y:'FY23', v:3.98}, {y:'FY24', v:4.46}, {y:'FY25', v:4.54}, {y:'FY26A', v:5.40}, {y:'FY27E', v:6.50}]
  },
  // ---------- New launches (Page 4-5) ----------
  launches: [
    {n:1, name:'Sobha Hoskote 1 (Apt+Retail)', city:'Bangalore', month:'May-26', q:'Q1', sba:5448851, inv:70835, share:70835, real:13000, inv26:1804, land:750, appr:257, total:1007, pre:2812},
    {n:2, name:'SOBHA Boulevard, Mysore', city:'Bangalore', month:'Jun-26', q:'Q1', sba:196647, inv:1180, share:1180, real:6000, inv26:70, land:0, appr:20, total:20, pre:0},
    {n:3, name:'Sacred Grove Chikkatirupati (Plotted DM)', city:'Bangalore', month:'Jun-26', q:'Q1', sba:493778, inv:2963, share:1116, real:6000, inv26:0, land:0, appr:0, total:0, pre:0},
    {n:4, name:'Lifestyle Phase VI (Rowhouses)', city:'Bangalore', month:'Jun-26', q:'Q1', sba:81771, inv:1357, share:1018, real:16600, inv26:35, land:0, appr:5, total:5, pre:40},
    {n:5, name:'SOBHA Liora', city:'Bangalore', month:'Sep-26', q:'Q2', sba:402947, inv:6246, share:6246, real:15500, inv26:79, land:0, appr:50, total:50, pre:129},
    {n:6, name:'Lifestyle Phase V (Apartments)', city:'Bangalore', month:'Dec-26', q:'Q3', sba:304701, inv:3961, share:2971, real:13000, inv26:50, land:0, appr:54, total:54, pre:104},
    {n:7, name:'Sobha Mullur', city:'Bangalore', month:'Jan-27', q:'Q4', sba:2261896, inv:29405, share:29405, real:13000, inv26:338, land:73, appr:487, total:561, pre:898},
    {n:8, name:'TV Aleyas (Apartment)', city:'Bangalore', month:'Mar-27', q:'Q4', sba:5035474, inv:67979, share:50304, real:13500, inv26:1711, land:210, appr:960, total:1170, pre:2881},
    {n:9, name:'SOBHA Crescent Phase I', city:'Gurgaon', month:'Apr-26', q:'Q1', sba:869574, inv:21739, share:11957, real:25000, inv26:823, land:0, appr:0, total:0, pre:823},
    {n:10, name:'SOBHA Crescent Phase II', city:'Gurgaon', month:'Dec-26', q:'Q3', sba:593669, inv:15435, share:8489, real:26000, inv26:757, land:81, appr:46, total:128, pre:885},
    {n:11, name:'ICG Commercial (Office)', city:'Gurgaon', month:'Feb-27', q:'Q4', sba:600000, inv:12000, share:12000, real:20000, inv26:4467, land:0, appr:36, total:36, pre:4503},
    {n:12, name:'SOBHA Bellevue (Feroke)', city:'Calicut', month:'Aug-26', q:'Q2', sba:808981, inv:9708, share:7572, real:12000, inv26:584, land:0, appr:131, total:131, pre:715},
    {n:13, name:'Sobha Ollur', city:'Thrissur', month:'Sep-26', q:'Q2', sba:739823, inv:9618, share:9618, real:13000, inv26:436, land:88, appr:0, total:88, pre:524},
    {n:14, name:'SOBHA Wisteria', city:'Chennai', month:'Aug-26', q:'Q2', sba:1358376, inv:20376, share:20376, real:15000, inv26:458, land:343, appr:252, total:595, pre:1053},
    {n:15, name:'SOBHA Inizio Phase II (Apt)', city:'Mumbai', month:'Aug-26', q:'Q2', sba:141193, inv:8316, share:6287, real:58896, inv26:20, land:1143, appr:0, total:1143, pre:1163},
    {n:16, name:'Chandivali (Apt+Retail)', city:'Mumbai', month:'Feb-27', q:'Q4', sba:262460, inv:12512, share:12512, real:47672, inv26:308, land:2471, appr:362, total:2833, pre:3141},
    {n:17, name:'Sobha Kismatpur', city:'Hyderabad', month:'Dec-26', q:'Q3', sba:1713400, inv:23131, share:18496, real:13500, inv26:25, land:222, appr:228, total:449, pre:474},
    {n:18, name:'Sobha Pisoli 1', city:'Pune', month:'Feb-27', q:'Q4', sba:926263, inv:12505, share:9566, real:13500, inv26:215, land:0, appr:0, total:0, pre:215}
  ],
  // ---------- Inventory movement (Page 6) ----------
  inv: [
    {city:'Bangalore', oSft:3259006, oVal:47086, oReleased:41440, oUnreleased:5646, nSft:14226065, nVal:183925, sSft:17485071, sVal:231011, salesSft:6651857, salesVal:86595, pct:37.5, cSft:10833214, cVal:144417},
    {city:'Gurgaon', oSft:2025009, oVal:48014, oReleased:39085, oUnreleased:8929, nSft:2063243, nVal:49175, sSft:4088252, sVal:97189, salesSft:1754581, salesVal:42864, pct:44.1, cSft:2333671, cVal:54325},
    {city:'Greater Noida', oSft:2288124, oVal:34784, oReleased:15830, oUnreleased:18954, nSft:0, nVal:0, sSft:2288124, sVal:34784, salesSft:967102, salesVal:14678, pct:42.2, cSft:1321022, cVal:20106},
    {city:'Cochin', oSft:1134118, oVal:14855, oReleased:8400, oUnreleased:6455, nSft:0, nVal:0, sSft:1134118, sVal:14855, salesSft:443555, salesVal:5834, pct:39.3, cSft:690563, cVal:9021},
    {city:'Thrissur', oSft:122959, oVal:1235, oReleased:1235, oUnreleased:0, nSft:739823, nVal:9618, sSft:862782, sVal:10853, salesSft:211766, salesVal:2415, pct:22.2, cSft:651016, cVal:8438},
    {city:'Trivandrum', oSft:220204, oVal:2896, oReleased:2896, oUnreleased:0, nSft:0, nVal:0, sSft:220204, sVal:2896, salesSft:135700, salesVal:1780, pct:61.5, cSft:84504, cVal:1115},
    {city:'Calicut', oSft:52221, oVal:376, oReleased:376, oUnreleased:0, nSft:808981, nVal:9708, sSft:861202, sVal:10084, salesSft:159472, salesVal:1800, pct:17.8, cSft:701730, cVal:8284},
    {city:'Chennai', oSft:62712, oVal:364, oReleased:364, oUnreleased:0, nSft:1358376, nVal:20376, sSft:1421088, sVal:20739, salesSft:158172, salesVal:2246, pct:10.8, cSft:1262916, cVal:18493},
    {city:'Coimbatore', oSft:22487, oVal:51, oReleased:51, oUnreleased:0, nSft:0, nVal:0, sSft:22487, sVal:51, salesSft:0, salesVal:0, pct:0.0, cSft:22487, cVal:51},
    {city:'GIFT City', oSft:1008142, oVal:12327, oReleased:12327, oUnreleased:0, nSft:0, nVal:0, sSft:1008142, sVal:12327, salesSft:156295, salesVal:1911, pct:15.5, cSft:851847, cVal:10416},
    {city:'Hyderabad', oSft:92430, oVal:1379, oReleased:1379, oUnreleased:0, nSft:1713400, nVal:23131, sSft:1805830, sVal:24510, salesSft:452142, salesVal:6158, pct:25.1, cSft:1353688, cVal:18351},
    {city:'Pune', oSft:99533, oVal:1288, oReleased:1288, oUnreleased:0, nSft:926263, nVal:12505, sSft:1025796, sVal:13792, salesSft:128828, salesVal:1683, pct:12.2, cSft:896968, cVal:12109},
    {city:'Mumbai', oSft:120346, oVal:6244, oReleased:6244, oUnreleased:0, nSft:403653, nVal:20828, sSft:523999, sVal:27072, salesSft:104050, salesVal:5433, pct:20.1, cSft:419949, cVal:21639}
  ],
  // ---------- Walkthroughs (Page 10) ----------
  walkthroughs: [
    {city:'Bangalore', u26:2253, sba26:3379152, u27:2516, sba27:4102356, growth:21.4},
    {city:'Gurgaon', u26:336, sba26:710932, u27:180, sba27:458264, growth:-35.5},
    {city:'Cochin', u26:112, sba26:366566, u27:273, sba27:662385, growth:80.7},
    {city:'Thrissur', u26:72, sba26:239222, u27:252, sba27:565293, growth:136.3},
    {city:'Trivandrum', u26:50, sba26:100439, u27:48, sba27:95993, growth:-4.4},
    {city:'Calicut', u26:6, sba26:28300, u27:0, sba27:0, growth:-100},
    {city:'Chennai', u26:267, sba26:440328, u27:20, sba27:36028, growth:-91.8},
    {city:'Hyderabad', u26:0, sba26:0, u27:118, sba27:301328, growth:0},
    {city:'Pune', u26:92, sba26:139544, u27:111, sba27:279192, growth:100.1}
  ],
  // ---------- Project sales (Annexure 2 condensed) ----------
  projects: [
    // Bangalore launches
    {n:'Sobha Hoskote 1 (Apt+Retail)', city:'Bangalore', status:'Forthcoming', units:1595, sba:2453773, val:31899, share:31899},
    {n:'TV Aleyas (Apartment)', city:'Bangalore', status:'Forthcoming', units:464, sba:755891, val:10205, share:7551},
    {n:'Sobha Mullur', city:'Bangalore', status:'Forthcoming', units:438, sba:628623, val:8172, share:8172},
    {n:'Sobha Liora', city:'Bangalore', status:'Forthcoming', units:161, sba:324372, val:5028, share:5028},
    {n:'Lifestyle Phase V (Apartments)', city:'Bangalore', status:'Forthcoming', units:92, sba:151527, val:1970, share:1477},
    {n:'SOBHA Boulevard, Mysore', city:'Bangalore', status:'Forthcoming', units:90, sba:140462, val:843, share:843},
    {n:'Sacred Grove Chikkatirupati (Plotted DM)', city:'Bangalore', status:'Forthcoming', units:260, sba:397468, val:2385, share:898},
    {n:'Lifestyle Phase VI (Rowhouses)', city:'Bangalore', status:'Forthcoming', units:20, sba:68143, val:1131, share:848},
    // Bangalore ongoing
    {n:'Sobha Town Park', city:'Bangalore', status:'Ongoing', units:351, sba:648364, val:8542, share:6366},
    {n:'Sobha Neopolis', city:'Bangalore', status:'Ongoing', units:164, sba:375468, val:5185, share:5185},
    {n:'Sobha Infinia', city:'Bangalore', status:'Ongoing', units:59, sba:152878, val:3059, share:1652},
    {n:'Sobha Ayana', city:'Bangalore', status:'Ongoing', units:206, sba:343573, val:4772, share:4772},
    {n:'Sobha Altair', city:'Bangalore', status:'Ongoing', units:45, sba:100664, val:1738, share:1321},
    {n:'Sobha Magnus', city:'Bangalore', status:'Ongoing', units:28, sba:52979, val:885, share:885},
    {n:'Sobha Valley View - Heritage', city:'Bangalore', status:'Ongoing', units:18, sba:28008, val:364, share:364},
    {n:'Sobha Galera', city:'Bangalore', status:'Ongoing', units:2, sba:8659, val:148, share:148},
    {n:'Sobha Brooklyn Towers', city:'Bangalore', status:'Ongoing', units:5, sba:8014, val:107, share:82},
    {n:'Sobha Sentosa', city:'Bangalore', status:'Ongoing', units:5, sba:8726, val:112, share:87},
    // Gurgaon
    {n:'SOBHA Crescent Phase I', city:'Gurgaon', status:'Forthcoming', units:275, sba:711705, val:17793, share:9786},
    {n:'SOBHA Crescent Phase II', city:'Gurgaon', status:'Forthcoming', units:78, sba:191348, val:4975, share:2736},
    {n:'ICG Commercial (Office)', city:'Gurgaon', status:'Forthcoming', units:30, sba:63480, val:1270, share:1270},
    {n:'Sobha Aranya', city:'Gurgaon', status:'Ongoing', units:120, sba:462269, val:11555, share:5810},
    {n:'Sobha Altus', city:'Gurgaon', status:'Ongoing', units:60, sba:204589, val:4354, share:2830},
    {n:'Sobha Strada Service Apt', city:'Gurgaon', status:'Ongoing', units:126, sba:113257, val:2662, share:1914},
    {n:'Sobha Strada Retail', city:'Gurgaon', status:'Ongoing', units:11, sba:7933, val:256, share:163},
    // Greater Noida
    {n:'Sobha Rivana', city:'Greater Noida', status:'Ongoing', units:503, sba:946811, val:14379, share:9634},
    {n:'Sobha Aurum', city:'Greater Noida', status:'Ongoing', units:11, sba:20291, val:300, share:300},
    // Chennai
    {n:'SOBHA Wisteria', city:'Chennai', status:'Forthcoming', units:83, sba:134541, val:2018, share:2018},
    {n:'Sobha Arbor', city:'Chennai', status:'Ongoing', units:15, sba:23631, val:228, share:186},
    // Coimbatore (ongoing, no FY27 sales)
    {n:'Sobha Mountain Mist', city:'Coimbatore', status:'Ongoing', units:5, sba:14108, val:0, share:0},
    {n:'Harishree Garden Phase II', city:'Coimbatore', status:'Ongoing', units:2, sba:6614, val:0, share:0},
    {n:'Harishree Garden Phase III', city:'Coimbatore', status:'Ongoing', units:1, sba:1765, val:0, share:0},
    // Hyderabad
    {n:'Sobha Kismatpur', city:'Hyderabad', status:'Forthcoming', units:200, sba:416379, val:5621, share:4495},
    {n:'Sobha Water Front', city:'Hyderabad', status:'Ongoing', units:12, sba:35763, val:537, share:537},
    // Cochin
    {n:'Marina One Phase II', city:'Cochin', status:'Ongoing', units:124, sba:308491, val:4252, share:2126},
    {n:'Sobha Atlantis', city:'Cochin', status:'Ongoing', units:60, sba:135063, val:1582, share:1455},
    // Thrissur
    {n:'Sobha Ollur', city:'Thrissur', status:'Forthcoming', units:42, sba:97102, val:1262, share:1262},
    {n:'Sobha Silver Estate', city:'Thrissur', status:'Ongoing', units:11, sba:30414, val:303, share:303},
    {n:'Sobha Metropolis', city:'Thrissur', status:'Ongoing', units:35, sba:84250, val:849, share:849},
    // Trivandrum
    {n:'Sobha Woods Whispering Hill', city:'Trivandrum', status:'Ongoing', units:50, sba:114312, val:1530, share:1530},
    {n:'Sobha Ridge Whispering Hill', city:'Trivandrum', status:'Ongoing', units:10, sba:21388, val:250, share:250},
    // Calicut
    {n:'SOBHA Bellevue (Feroke)', city:'Calicut', status:'Forthcoming', units:50, sba:135735, val:1629, share:1270},
    {n:'Sobha Bela Encosta', city:'Calicut', status:'Ongoing', units:5, sba:23737, val:171, share:128},
    // GIFT
    {n:'Sobha Elysia', city:'GIFT City', status:'Ongoing', units:72, sba:156295, val:1911, share:1911},
    // Mumbai
    {n:'Sobha Inizio Phase I', city:'Mumbai', status:'Ongoing', units:37, sba:35910, val:1863, share:1408},
    {n:'SOBHA Inizio Phase II (Apt)', city:'Mumbai', status:'Forthcoming', units:35, sba:35298, val:2079, share:1572},
    {n:'Chandivali (Apt+Retail)', city:'Mumbai', status:'Forthcoming', units:44, sba:32842, val:1491, share:1491},
    // Pune
    {n:'Sobha Pisoli 1', city:'Pune', status:'Forthcoming', units:21, sba:29294, val:395, share:303},
    {n:'Sobha Nesara', city:'Pune', status:'Ongoing', units:37, sba:99533, val:1288, share:1288}
  ],
  // ---------- Ongoing inventory (Annexure 2a) ----------
  ongoing: [
    {n:'Sobha Town Park', city:'Bangalore', open:19234, sales:8542, share:6366, close:10692, pct:44},
    {n:'Sobha Neopolis', city:'Bangalore', open:7636, sales:5185, share:5185, close:2451, pct:68},
    {n:'Sobha Infinia', city:'Bangalore', open:4418, sales:3059, share:1652, close:1359, pct:69},
    {n:'Sobha Ayana', city:'Bangalore', open:6798, sales:4772, share:4772, close:2026, pct:70},
    {n:'Sobha Altair', city:'Bangalore', open:6412, sales:1738, share:1321, close:4674, pct:27},
    {n:'Sobha Magnus', city:'Bangalore', open:1074, sales:885, share:885, close:189, pct:82},
    {n:'Sobha Valley View - Heritage', city:'Bangalore', open:364, sales:364, share:364, close:0, pct:100},
    {n:'Sobha Galera', city:'Bangalore', open:148, sales:148, share:148, close:0, pct:100},
    {n:'Sobha Dream Gardens', city:'Bangalore', open:15, sales:15, share:11, close:0, pct:100},
    {n:'Sobha Brooklyn Towers', city:'Bangalore', open:107, sales:107, share:82, close:0, pct:100},
    {n:'Sobha Sentosa', city:'Bangalore', open:112, sales:112, share:87, close:0, pct:100},
    {n:'Sobha Manhattan', city:'Bangalore', open:22, sales:22, share:17, close:0, pct:100},
    {n:'Sobha Insignia', city:'Bangalore', open:711, sales:0, share:0, close:711, pct:0},
    {n:'Sobha Lake Gardens', city:'Bangalore', open:14, sales:14, share:9, close:0, pct:100},
    {n:'Sobha Retreat', city:'Bangalore', open:5, sales:0, share:0, close:5, pct:0},
    {n:'Sobha Garrison', city:'Bangalore', open:10, sales:0, share:0, close:10, pct:0},
    {n:'Sobha Meadows', city:'Bangalore', open:6, sales:0, share:0, close:6, pct:0},
    {n:'Sobha Aranya', city:'Gurgaon', open:31884, sales:11555, share:5810, close:20329, pct:36},
    {n:'Sobha Altus', city:'Gurgaon', open:13181, sales:4354, share:2830, close:8826, pct:33},
    {n:'Sobha Strada Service Apt', city:'Gurgaon', open:2662, sales:2662, share:1914, close:0, pct:100},
    {n:'Sobha Strada Retail', city:'Gurgaon', open:256, sales:256, share:163, close:0, pct:100},
    {n:'International City Ph 1 & 2', city:'Gurgaon', open:31, sales:0, share:0, close:31, pct:0},
    {n:'Sobha Rivana', city:'Greater Noida', open:34484, sales:14379, share:9634, close:20106, pct:42},
    {n:'Sobha Aurum', city:'Greater Noida', open:300, sales:300, share:300, close:0, pct:100},
    {n:'Sobha Conserve', city:'Chennai', open:41, sales:0, share:0, close:41, pct:0},
    {n:'Sobha Arbor', city:'Chennai', open:259, sales:228, share:186, close:31, pct:88},
    {n:'Sobha Blossom', city:'Chennai', open:18, sales:0, share:0, close:18, pct:0},
    {n:'Sobha Evergreens', city:'Chennai', open:28, sales:0, share:0, close:28, pct:0},
    {n:'Sobha Evergreens Annexe', city:'Chennai', open:17, sales:0, share:0, close:17, pct:0},
    {n:'Sobha Water Front', city:'Hyderabad', open:1379, sales:537, share:537, close:842, pct:39},
    {n:'Sobha Mountain Mist', city:'Coimbatore', open:32, sales:0, share:0, close:32, pct:0},
    {n:'Harishree Garden Phase II', city:'Coimbatore', open:15, sales:0, share:0, close:15, pct:0},
    {n:'Harishree Garden Phase III', city:'Coimbatore', open:4, sales:0, share:0, close:4, pct:0},
    {n:'Marina One Phase II', city:'Cochin', open:9809, sales:4252, share:2126, close:5557, pct:43},
    {n:'Sobha Atlantis', city:'Cochin', open:4794, sales:1582, share:1455, close:3213, pct:33},
    {n:'Marina One', city:'Cochin', open:251, sales:0, share:0, close:251, pct:0},
    {n:'Sobha Silver Estate', city:'Thrissur', open:386, sales:303, share:303, close:83, pct:79},
    {n:'Sobha Metropolis', city:'Thrissur', open:849, sales:849, share:849, close:0, pct:100},
    {n:'Sobha Woods Whispering Hill', city:'Trivandrum', open:2602, sales:1530, share:1530, close:1072, pct:59},
    {n:'Sobha Ridge Whispering Hill', city:'Trivandrum', open:250, sales:250, share:250, close:0, pct:100},
    {n:'Sobha Meadows Whispering Hill', city:'Trivandrum', open:43, sales:0, share:0, close:43, pct:0},
    {n:'Sobha Bela Encosta', city:'Calicut', open:376, sales:171, share:128, close:205, pct:45},
    {n:'Sobha Elysia', city:'GIFT City', open:12314, sales:1911, share:1911, close:10403, pct:15},
    {n:'Sobha Dream Heights', city:'GIFT City', open:13, sales:0, share:0, close:13, pct:0},
    {n:'Sobha Inizio Phase I', city:'Mumbai', open:6244, sales:1863, share:1408, close:4381, pct:30},
    {n:'Sobha Nesara', city:'Pune', open:1288, sales:1288, share:1288, close:0, pct:100}
  ],
  // ---------- Launch calendar (Annexure 1a) ----------
  launchCal: {
    'Q1':[
      {m:'Apr-26', items:[{n:'SOBHA Crescent Phase I', city:'Gurgaon', sba:869574, inv:21739}]},
      {m:'May-26', items:[{n:'Sobha Hoskote 1 (Apt+Retail)', city:'Bangalore', sba:5448851, inv:70835}]},
      {m:'Jun-26', items:[{n:'Lifestyle Phase VI (Rowhouses)', city:'Bangalore', sba:81771, inv:1357},{n:'SOBHA Boulevard, Mysore', city:'Bangalore', sba:196647, inv:1180},{n:'Sacred Grove Chikkatirupati (Plotted DM)', city:'Bangalore', sba:493778, inv:2963}]}
    ],
    'Q2':[
      {m:'Jul-26', items:[]},
      {m:'Aug-26', items:[{n:'SOBHA Wisteria', city:'Chennai', sba:1358376, inv:20376},{n:'SOBHA Inizio Phase II (Apt)', city:'Mumbai', sba:141193, inv:8316},{n:'SOBHA Bellevue (Feroke)', city:'Calicut', sba:808981, inv:9708}]},
      {m:'Sep-26', items:[{n:'Sobha Ollur', city:'Thrissur', sba:739823, inv:9618},{n:'SOBHA Liora', city:'Bangalore', sba:402947, inv:6246}]}
    ],
    'Q3':[
      {m:'Oct-26', items:[]},
      {m:'Nov-26', items:[]},
      {m:'Dec-26', items:[{n:'SOBHA Crescent Phase II', city:'Gurgaon', sba:593669, inv:15435},{n:'Sobha Kismatpur', city:'Hyderabad', sba:1713400, inv:23131},{n:'Lifestyle Phase V (Apartments)', city:'Bangalore', sba:304701, inv:3961}]}
    ],
    'Q4':[
      {m:'Jan-27', items:[{n:'Sobha Mullur', city:'Bangalore', sba:2261896, inv:29405}]},
      {m:'Feb-27', items:[{n:'ICG Commercial (Office)', city:'Gurgaon', sba:600000, inv:12000},{n:'Sobha Pisoli 1', city:'Pune', sba:926263, inv:12505},{n:'Chandivali (Apt+Retail)', city:'Mumbai', sba:262460, inv:12512}]},
      {m:'Mar-27', items:[{n:'TV Aleyas (Apartment)', city:'Bangalore', sba:5035474, inv:67979}]}
    ]
  },
  // ---------- Walkthrough calendar (Annexure 1b) ----------
  wtCal: {
    'Q1':[
      {m:'Apr-26', items:[{n:'Sobha Insignia', city:'Bangalore', u:33, sba:80251},{n:'Sobha Galera Villa 18&19', city:'Bangalore', u:2, sba:8651},{n:'Sobha Whispering Hills Mdws-1', city:'Trivandrum', u:48, sba:95993},{n:'Sobha Royal Crest Wing 3', city:'Bangalore', u:110, sba:215459}]},
      {m:'May-26', items:[{n:'Sobha Brooklyn Twrs Wing 3', city:'Bangalore', u:261, sba:197036},{n:'Sobha Victoria Park Wing 3', city:'Bangalore', u:60, sba:107954},{n:'Sobha Arbor Wing 6', city:'Chennai', u:20, sba:36028}]},
      {m:'Jun-26', items:[{n:'Sobha Atlantis Block 4', city:'Cochin', u:96, sba:222833},{n:'Sobha Oakshire Phase 1', city:'Bangalore', u:30, sba:103296}]}
    ],
    'Q2':[
      {m:'Jul-26', items:[{n:'Chartered Birdsong', city:'Bangalore', u:264, sba:441582},{n:'Marina One Ph-II E5', city:'Cochin', u:81, sba:217483},{n:'Sobha Neopolis P2-W18', city:'Bangalore', u:75, sba:185377}]},
      {m:'Aug-26', items:[{n:'Sobha Atlantis Block 3', city:'Cochin', u:96, sba:222069},{n:'Sobha Metropolis P-I W2', city:'Thrissur', u:84, sba:191556},{n:'Sobha City G6 D2', city:'Gurgaon', u:72, sba:174533},{n:'Sobha Royal Crest Wing 1', city:'Bangalore', u:110, sba:215513},{n:'Sobha Dream Garden P2-W10', city:'Bangalore', u:142, sba:118995}]},
      {m:'Sep-26', items:[{n:'Sobha Brooklyn Twrs Wing 1', city:'Bangalore', u:99, sba:201408},{n:'Sobha Neopolis P2-W17', city:'Bangalore', u:112, sba:203249}]}
    ],
    'Q3':[
      {m:'Oct-26', items:[{n:'Sobha Victoria Park W5', city:'Bangalore', u:60, sba:107105},{n:'Sobha Neopolis P2-W14', city:'Bangalore', u:111, sba:73338},{n:'Sobha Neopolis P2-W15', city:'Bangalore', u:114, sba:75320},{n:'Sobha Manhattan Twrs W2', city:'Bangalore', u:138, sba:206861},{n:'Sobha Metropolis P-I W3', city:'Thrissur', u:92, sba:167721},{n:'Sobha City G6 Z1', city:'Gurgaon', u:54, sba:141865},{n:'Sobha Water Front T3', city:'Hyderabad', u:58, sba:121770}]},
      {m:'Nov-26', items:[{n:'Sobha Royal Crest Wing 2', city:'Bangalore', u:109, sba:223457}]},
      {m:'Dec-26', items:[{n:'Sobha Metropolis P-I W1', city:'Thrissur', u:76, sba:206016},{n:'Sobha Neopolis P-1 W7', city:'Bangalore', u:114, sba:206426},{n:'Sobha Manhattan Twrs W1', city:'Bangalore', u:142, sba:230767},{n:'Sobha Oakshire Phase 2', city:'Bangalore', u:30, sba:103296}]}
    ],
    'Q4':[
      {m:'Jan-27', items:[{n:'Sobha Neopolis P2-W16', city:'Bangalore', u:112, sba:203249},{n:'Sobha Water Front T4', city:'Hyderabad', u:60, sba:179558},{n:'Sobha City G6 Z2', city:'Gurgaon', u:54, sba:141865},{n:'Sobha Brooklyn Twrs Wing 2', city:'Bangalore', u:99, sba:201408},{n:'Sobha Nesara Block 3', city:'Pune', u:111, sba:279192}]},
      {m:'Feb-27', items:[{n:'Sobha Neopolis P-1 W5', city:'Bangalore', u:113, sba:204540},{n:'Sobha Neopolis P2-W19', city:'Bangalore', u:76, sba:187818}]},
      {m:'Mar-27', items:[]}
    ]
  },

  // ============== CASH FLOW ==============
  // Consolidated CFS (Page 14-15)
  cfs: {
    summary: [
      {label:'Total Cash Inflow', fy27:109011, growth:37.9, fy26:79070, q1:20562, q2:27193, q3:28997, q4:32259, type:'inflow'},
      {label:'Total Cash Outflow', fy27:112496, growth:45.4, fy26:77376, q1:31016, q2:27213, q3:27459, q4:26808, type:'outflow'},
      {label:'Net Cashflow', fy27:-3485, growth:-305.7, fy26:1694, q1:-10453, q2:-21, q3:1539, q4:5451, type:'net'},
      {label:'Net Cashflow before Land', fy27:15942, growth:11, fy26:14371, q1:382, q2:4119, q3:4243, q4:7198, type:'sub'}
    ],
    inflow: [
      {label:'Operating Cash Inflow', fy27:108147, fy26:77359, q1:20542, q2:27163, q3:28482, q4:31959, level:0},
      {label:'Real Estate Inflow', fy27:100331, fy26:70042, q1:18740, q2:25199, q3:26435, q4:29958, level:1},
      {label:'· RE Residential Collection', fy27:96601, fy26:66622, q1:17967, q2:24245, q3:25420, q4:28969, level:2},
      {label:'· Reimbursements (Marina One, JD)', fy27:1339, fy26:1136, q1:314, q2:351, q3:337, q4:336, level:2},
      {label:'· RE FMD Corpus', fy27:1080, fy26:1004, q1:144, q2:286, q3:337, q4:313, level:2},
      {label:'· RE FMD Collection', fy27:318, fy26:383, q1:80, q2:79, q3:79, q4:79, level:2},
      {label:'· RE Commercial', fy27:953, fy26:857, q1:225, q2:226, q3:251, q4:251, level:2},
      {label:'· RE Clubhouses', fy27:40, fy26:40, q1:10, q2:10, q3:10, q4:10, level:2},
      {label:'Contractual Inflow', fy27:2488, fy26:2709, q1:574, q2:656, q3:678, q4:580, level:1},
      {label:'· CIVIL', fy27:1137, fy26:1157, q1:344, q2:332, q3:270, q4:191, level:2},
      {label:'· PHE', fy27:500, fy26:669, q1:69, q2:154, q3:153, q4:124, level:2},
      {label:'· ELE', fy27:850, fy26:883, q1:161, q2:169, q3:255, q4:265, level:2},
      {label:'Manufacturing Inflow', fy27:5328, fy26:4608, q1:1228, q2:1308, q3:1369, q4:1422, level:1},
      {label:'· Glazing & Metal Works', fy27:2523, fy26:2078, q1:580, q2:622, q3:649, q4:672, level:2},
      {label:'· Interiors', fy27:1304, fy26:887, q1:287, q2:307, q3:338, q4:372, level:2},
      {label:'· Concrete Products', fy27:864, fy26:1210, q1:216, q2:216, q3:216, q4:216, level:2},
      {label:'· Mattresses', fy27:217, fy26:137, q1:46, q2:59, q3:59, q4:52, level:2},
      {label:'· metercube', fy27:420, fy26:296, q1:98, q2:105, q3:106, q4:111, level:2},
      {label:'Non-Operating Cash Inflow', fy27:864, fy26:1711, q1:20, q2:30, q3:515, q4:299, level:0},
      {label:'· Interest on FD', fy27:864, fy26:626, q1:20, q2:30, q3:515, q4:299, level:1},
      {label:'· Land Monetization', fy27:0, fy26:1073, q1:0, q2:0, q3:0, q4:0, level:1},
      {label:'· Rights Issue', fy27:0, fy26:12, q1:0, q2:0, q3:0, q4:0, level:1}
    ],
    outflow: [
      {label:'Operational Cash Outflow', fy27:84935, fy26:61619, q1:18102, q2:21758, q3:22385, q4:22691, level:0},
      {label:'Real Estate Outflow', fy27:66206, fy26:46751, q1:13619, q2:17145, q3:17605, q4:17837, level:1},
      {label:'· RE Project Expenses', fy27:37093, fy26:27230, q1:8162, q2:9359, q3:9755, q4:9817, level:2},
      {label:'· JD Payments, Registration', fy27:16290, fy26:13479, q1:2835, q2:4483, q3:4173, q4:4799, level:2},
      {label:'· RE Marketing, Brokerage, Incentive', fy27:6579, fy26:3136, q1:1069, q2:1487, q3:1613, q4:2410, level:2},
      {label:'· RE Approval Expenses', fy27:3785, fy26:1789, q1:937, q2:1157, q3:1280, q4:410, level:2},
      {label:'· RE Commercial Operations', fy27:349, fy26:214, q1:88, q2:86, q3:87, q4:88, level:2},
      {label:'· RE Clubhouse Operations', fy27:18, fy26:19, q1:5, q2:4, q3:4, q4:4, level:2},
      {label:'· FMD Expenses', fy27:756, fy26:817, q1:165, q2:182, q3:204, q4:205, level:2},
      {label:'· Corpus Repayment', fy27:1337, fy26:67, q1:359, q2:386, q3:489, q4:103, level:2},
      {label:'Contractual Outflow', fy27:1814, fy26:2182, q1:476, q2:488, q3:482, q4:367, level:1},
      {label:'· CIVIL', fy27:776, fy26:1007, q1:301, q2:236, q3:167, q4:72, level:2},
      {label:'· PHE', fy27:400, fy26:529, q1:56, q2:125, q3:122, q4:96, level:2},
      {label:'· ELE', fy27:638, fy26:646, q1:119, q2:127, q3:192, q4:199, level:2},
      {label:'Manufacturing Outflow', fy27:4545, fy26:3672, q1:1054, q2:1126, q3:1156, q4:1210, level:1},
      {label:'· Glazing & Metal Works', fy27:2157, fy26:1809, q1:488, q2:531, q3:556, q4:583, level:2},
      {label:'· Interiors', fy27:1182, fy26:658, q1:273, q2:292, q3:295, q4:323, level:2},
      {label:'· Concrete Products', fy27:713, fy26:882, q1:178, q2:178, q3:178, q4:178, level:2},
      {label:'· Mattresses', fy27:192, fy26:116, q1:43, q2:51, q3:52, q4:46, level:2},
      {label:'· metercube', fy27:301, fy26:207, q1:72, q2:75, q3:75, q4:79, level:2},
      {label:'Corporate Outflow', fy27:12370, fy26:9014, q1:2953, q2:2998, q3:3142, q4:3277, level:1},
      {label:'· Overheads', fy27:4169, fy26:2932, q1:1177, q2:997, q3:997, q4:997, level:2},
      {label:'· CSR', fy27:150, fy26:60, q1:38, q2:38, q3:38, q4:38, level:2},
      {label:'· GST', fy27:6104, fy26:3508, q1:1223, q2:1513, q3:1577, q4:1790, level:2},
      {label:'· TDS & Income Tax', fy27:1947, fy26:2514, q1:515, q2:450, q3:530, q4:452, level:2},
      {label:'Non-Operating Outflow', fy27:27561, fy26:15757, q1:12914, q2:5456, q3:5074, q4:4117, level:0},
      {label:'· Interest, Processing Fee, Bank Charges', fy27:1025, fy26:879, q1:256, q2:256, q3:256, q4:256, level:1},
      {label:'· Dividend', fy27:642, fy26:321, q1:642, q2:0, q3:0, q4:0, level:1},
      {label:'· Land Payments', fy27:19427, fy26:12677, q1:10836, q2:4140, q3:2704, q4:1747, level:1},
      {label:'· Capex – General', fy27:6467, fy26:1830, q1:1181, q2:1060, q3:2113, q4:2114, level:1}
    ],
    // Segment-wise CFS (Page 16)
    segments: [
      {seg:'RE Residential', billing:97460, in:97465, out:101377, net:-3912, opIn:96601, opOut:74301, npOp:22300, ndOp:-26212},
      {seg:'RE Commercial', billing:897, in:953, out:720, net:233, opIn:953, opOut:583, npOp:370, ndOp:-137},
      {seg:'RE Clubhouses', billing:34, in:40, out:37, net:4, opIn:40, opOut:32, npOp:8, ndOp:-5},
      {seg:'RE FMD Operations', billing:919, in:318, out:934, net:-616, opIn:318, opOut:929, npOp:-611, ndOp:-5},
      {seg:'RE FMD Corpus', billing:1199, in:1080, out:1337, net:-257, opIn:1080, opOut:1337, npOp:-257, ndOp:0},
      {seg:'Reimbursements', billing:1229, in:1339, out:98, net:1240, opIn:1339, opOut:98, npOp:1240, ndOp:0},
      {seg:'Contracts', billing:2278, in:2488, out:2218, net:270, opIn:2488, opOut:2200, npOp:288, ndOp:-18},
      {seg:'Manufacturing', billing:4522, in:5328, out:5775, net:-447, opIn:5328, opOut:5454, npOp:-126, ndOp:-321}
    ],
    // City-wise residential CFS (Page 19)
    citiesCfs: [
      {city:'Bangalore', billing:51622, in:52693, out:41798, net:10894, opIn:51991, opOut:32655, ncfo:19336, land:5508, capex:2963, intFD:701, divIntCap:9143-5508-2963-701, total_nonOp:9143},
      {city:'Gurgaon', billing:19932, in:19521, out:22233, net:-2712, opIn:19437, opOut:17952, ncfo:1485, land:2937, capex:1044, intFD:84, total_nonOp:4281},
      {city:'Greater Noida', billing:5243, in:4817, out:11123, net:-6306, opIn:4817, opOut:3756, ncfo:1061, land:7100, capex:230, intFD:0, total_nonOp:7367},
      {city:'Cochin', billing:6920, in:6943, out:8055, net:-1112, opIn:6943, opOut:7254, ncfo:-311, land:0, capex:596, intFD:0, total_nonOp:802},
      {city:'Thrissur', billing:2593, in:2957, out:2216, net:741, opIn:2926, opOut:1838, ncfo:1088, land:88, capex:242, intFD:32, total_nonOp:378},
      {city:'Trivandrum', billing:1782, in:1778, out:1110, net:668, opIn:1768, opOut:965, ncfo:803, land:0, capex:126, intFD:10, total_nonOp:145},
      {city:'Calicut', billing:437, in:415, out:753, net:-338, opIn:415, opOut:676, ncfo:-261, land:0, capex:56, intFD:0, total_nonOp:77},
      {city:'Chennai', billing:720, in:694, out:1834, net:-1140, opIn:694, opOut:1328, ncfo:-635, land:343, capex:133, intFD:0, total_nonOp:505},
      {city:'Coimbatore', billing:1, in:1, out:3, net:-2, opIn:1, opOut:0, ncfo:1, land:0, capex:0, intFD:0, total_nonOp:3},
      {city:'GIFT City', billing:2952, in:2809, out:3199, net:-390, opIn:2809, opOut:2780, ncfo:29, land:0, capex:393, intFD:0, total_nonOp:419},
      {city:'Hyderabad', billing:2418, in:2286, out:2508, net:-222, opIn:2249, opOut:2044, ncfo:205, land:222, capex:209, intFD:37, total_nonOp:464},
      {city:'Pune', billing:1843, in:1692, out:1190, net:503, opIn:1692, opOut:1011, ncfo:681, land:0, capex:133, intFD:0, total_nonOp:178},
      {city:'Mumbai', billing:998, in:860, out:5205, net:-4346, opIn:860, opOut:1891, ncfo:-1032, land:3229, capex:43, intFD:0, total_nonOp:3314}
    ]
  },
  // Land payments (Page 23)
  landPay: [
    {city:'Bangalore', total:35587, sba:58.44, fy27:5508, balance:30079, growth:-32.9, committed:4458, strategic:1050, fy26:8210},
    {city:'Greater Noida', total:9340, sba:10.44, fy27:6090, balance:3250, growth:320.4, committed:0, strategic:6090, fy26:1449},
    {city:'Hyderabad', total:222, sba:1.71, fy27:222, balance:0, growth:786.2, committed:222, strategic:0, fy26:25},
    {city:'Mumbai', total:5400, sba:0.57, fy27:3229, balance:2170, growth:376.6, committed:3229, strategic:0, fy26:678},
    {city:'Gurgaon', total:4790, sba:10.06, fy27:2937, balance:1853, growth:93.7, committed:650, strategic:2287, fy26:1517},
    {city:'Ghaziabad', total:1010, sba:2.11, fy27:1010, balance:0, growth:0, committed:0, strategic:1010, fy26:0},
    {city:'Chennai', total:343, sba:1.66, fy27:343, balance:0, growth:77.7, committed:343, strategic:0, fy26:193},
    {city:'Thrissur', total:88, sba:0.74, fy27:88, balance:0, growth:-69.8, committed:88, strategic:0, fy26:292}
  ],
  // Capex (Page 22)
  capex: [
    {cat:'P&M – Projects', items:[
      {n:'System Formwork Typical', q1:446, q2:327, q3:505, q4:415, fy27:1692},
      {n:'Construction P&E', q1:213, q2:207, q3:255, q4:308, fy27:983},
      {n:'System Formwork Basement/Podium', q1:38, q2:152, q3:100, q4:165, fy27:455},
      {n:'Safety Climbing Platform', q1:45, q2:62, q3:53, q4:76, fy27:236},
      {n:'Workforce Accommodation', q1:42, q2:54, q3:68, q4:27, fy27:192},
      {n:'Conventional Shuttering', q1:4, q2:23, q3:9, q4:0, fy27:36},
      {n:'Power Tools', q1:19, q2:14, q3:14, q4:14, fy27:61},
      {n:'Office Containers', q1:27, q2:2, q3:6, q4:4, fy27:40},
      {n:'Lab Equipment', q1:3, q2:1, q3:3, q4:2, fy27:10},
      {n:'Marketing office', q1:92, q2:56, q3:68, q4:71, fy27:287}
    ], total:3991},
    {cat:'P&M – Factory', items:[
      {n:'Precast Factory', q1:0, q2:0, q3:553, q4:553, fy27:1106},
      {n:'Aluminium Factory', q1:0, q2:0, q3:270, q4:270, fy27:540},
      {n:'Rebar Factory', q1:0, q2:0, q3:89, q4:89, fy27:178}
    ], total:1824},
    {cat:'Divisions', items:[
      {n:'Glazing & Metal Works', q1:133, q2:41, q3:0, q4:0, fy27:174},
      {n:'Interiors', q1:12, q2:12, q3:12, q4:13, fy27:50},
      {n:'Concrete Products', q1:15, q2:15, q3:15, q4:15, fy27:60}
    ], total:284},
    {cat:'Corporate', items:[
      {n:'IT – Computers etc', q1:41, q2:41, q3:41, q4:41, fy27:164},
      {n:'Fixtures & Furniture', q1:25, q2:25, q3:25, q4:25, fy27:100},
      {n:'Miscellaneous', q1:25, q2:25, q3:25, q4:25, fy27:100}
    ], total:364},
    {cat:'RE-Commercial', items:[
      {n:'Lake View Club House', q1:1, q2:1, q3:0, q4:1, fy27:2},
      {n:'The Sobha Club – Gurgaon', q1:1, q2:1, q3:1, q4:0, fy27:3}
    ], total:5}
  ],
  // Finance cost (Page 42)
  fincost: [
    {item:'Interest on Borrowing', fy27:802, fy26:785, q1:198, q2:201, q3:200, q4:202},
    {item:'Processing fee', fy27:148, fy26:92, q1:37, q2:37, q3:37, q4:37},
    {item:'Interest on Maintenance Deposit', fy27:218, fy26:175, q1:55, q2:53, q3:54, q4:56},
    {item:'Interest others / Ind AS', fy27:0, fy26:293, q1:0, q2:0, q3:0, q4:0},
    {item:'Bank Charges', fy27:77, fy26:48, q1:13, q2:14, q3:21, q4:29},
    {item:'Interest from lease accounting', fy27:10, fy26:25, q1:3, q2:3, q3:3, q4:3},
    {item:'Inventorisation (added back)', fy27:949, fy26:403, q1:235, q2:238, q3:237, q4:239}
  ],

  // ============== P&L ==============
  // Consolidated P&L (Page 25-26)
  pl: {
    consol: [
      {label:'Revenue', fy27:68013, fy26:53838, fy25:41628, m27:0, m26:0, m25:0, type:'h'},
      {label:'· Real Estate', fy27:50244, fy26:37855, fy25:28021, type:'l'},
      {label:'· Real Estate – Gross Accounting', fy27:6669, fy26:4408, fy25:3770, type:'l'},
      {label:'· DM Projects', fy27:1308, fy26:1520, fy25:765, type:'l'},
      {label:'· Residential other income', fy27:350, fy26:767, fy25:1224, type:'l'},
      {label:'· Land Sale', fy27:0, fy26:-189, fy25:0, type:'l'},
      {label:'· Contracts', fy27:2340, fy26:2181, fy25:2385, type:'l'},
      {label:'· Commercial Properties', fy27:934, fy26:789, fy25:752, type:'l'},
      {label:'· Manufacturing units', fy27:3650, fy26:3662, fy25:3110, type:'l'},
      {label:'· Retail', fy27:540, fy26:386, fy25:354, type:'l'},
      {label:'· FMD', fy27:919, fy26:704, fy25:355, type:'l'},
      {label:'· Finance income', fy27:1060, fy26:1755, fy25:892, type:'l'},
      {label:'Cost', fy27:49249, fy26:41530, fy25:31621, type:'h'},
      {label:'· Real Estate', fy27:34777, fy26:30315, fy25:20536, m27:30.8, m26:19.9, m25:26.7, type:'l'},
      {label:'· Real Estate – Gross Accounting', fy27:6412, fy26:3880, fy25:3965, m27:3.9, m26:12.0, m25:-5.2, type:'l'},
      {label:'· DM Projects expenses', fy27:1223, fy26:665, fy25:416, m27:6.5, m26:56.3, m25:45.6, type:'l'},
      {label:'· Residential other expenses', fy27:672, fy26:182, fy25:500, m27:-92.0, m26:76.3, m25:59.1, type:'l'},
      {label:'· Contracts', fy27:1885, fy26:2099, fy25:2588, m27:19.4, m26:3.8, m25:-8.5, type:'l'},
      {label:'· Commercial Properties', fy27:331, fy26:252, fy25:223, m27:64.5, m26:68.0, m25:70.4, type:'l'},
      {label:'· Manufacturing units', fy27:2594, fy26:2836, fy25:2341, m27:28.9, m26:22.6, m25:24.7, type:'l'},
      {label:'· Retail', fy27:311, fy26:222, fy25:203, m27:42.3, m26:42.4, m25:42.8, type:'l'},
      {label:'· FMD', fy27:844, fy26:1079, fy25:640, m27:8.1, m26:-53.3, m25:-80.3, type:'l'},
      {label:'· Finance and other expenses', fy27:200, fy26:203, fy25:210, m27:81.1, m26:88.4, m25:76.5, type:'l'},
      {label:'Gross Margin', fy27:18763, fy26:12308, fy25:10006, m27:27.6, m26:22.9, m25:24.0, type:'t'},
      {label:'Brokerage Costs', fy27:1761, fy26:907, fy25:673, type:'h'},
      {label:'· Brokerage – Revenue recognised', fy27:782, fy26:584, fy25:503, type:'l'},
      {label:'· Brokerage – JD Share', fy27:979, fy26:323, fy25:170, type:'l'},
      {label:'Gross Margin Net of Brokerage', fy27:17003, fy26:11401, fy25:9334, m27:25.0, m26:21.2, m25:22.4, type:'t'},
      {label:'Indirect Cost', fy27:10470, fy26:7571, fy25:7280, type:'h'},
      {label:'· Marketing', fy27:2047, fy26:1047, fy25:694, type:'l'},
      {label:'· Incentive', fy27:1351, fy26:606, fy25:382, type:'l'},
      {label:'· Marketing & Incentive – others', fy27:13, fy26:32, fy25:49, type:'l'},
      {label:'· Overheads – Real Estate', fy27:3545, fy26:2950, fy25:2602, type:'l'},
      {label:'· Overheads – other businesses', fy27:624, fy26:502, fy25:661, type:'l'},
      {label:'· Finance cost', fy27:1232, fy26:1369, fy25:1934, type:'l'},
      {label:'· Finance cost – other businesses', fy27:22, fy26:6, fy25:59, type:'l'},
      {label:'· Depreciation – other businesses', fy27:307, fy26:310, fy25:218, type:'l'},
      {label:'· Depreciation – Real estate', fy27:1330, fy26:751, fy25:681, type:'l'},
      {label:'Impact of Inventorisation', fy27:684, fy26:1197, fy25:612, type:'h'},
      {label:'EBITDA', fy27:6988, fy26:3625, fy25:1497, m27:10.3, m26:6.7, m25:3.6, type:'t'},
      {label:'Profit before tax', fy27:5849, fy26:2633, fy25:1442, m27:8.6, m26:4.9, m25:3.5, type:'t'},
      {label:'Taxes', fy27:1472, fy26:665, fy25:383, type:'h'},
      {label:'Profit after tax', fy27:4376, fy26:1968, fy25:1058, m27:6.4, m26:3.7, m25:2.5, type:'t'},
      {label:'CSR', fy27:150, fy26:60, fy25:135, type:'h'},
      {label:'Profit after CSR', fy27:4226, fy26:1908, fy25:923, m27:6.2, m26:3.5, m25:2.2, type:'t'}
    ],
    // Segment P&L FY27E (Page 27-28)
    segments: [
      {seg:'RE Residential', rev:50244, cos:34777, gm:15467, gmp:30.8, oh:9090, ebitda:6377, ep:12.7, intc:2309, dep:528, pbt:3540, pat:2649, fy26:{rev:37855, cos:30315, gm:7540, gmp:19.9, oh:5985, intc:2475, dep:325, pbt:-1245, pat:-912}},
      {seg:'RE DM', rev:1308, cos:1223, gm:85, gmp:6.5, oh:0, ebitda:85, ep:6.5, intc:0, dep:0, pbt:85, pat:64, fy26:{rev:1520, cos:1079, gm:441, gmp:29.0, oh:0, pbt:441, pat:330}},
      {seg:'RE Gross Accounting', rev:6669, cos:6412, gm:257, gmp:3.9, oh:0, ebitda:257, ep:3.9, intc:0, dep:0, pbt:257, pat:193, fy26:{rev:4408, cos:3880, gm:528, gmp:12.0, oh:0, pbt:528, pat:395}},
      {seg:'RE Other income', rev:350, cos:672, gm:-322, gmp:-92.0, oh:0, ebitda:-322, ep:-92, intc:0, dep:0, pbt:-322, pat:-241, fy26:{rev:767, cos:182, gm:585, gmp:76.3, oh:0, pbt:585, pat:438}},
      {seg:'FMD', rev:919, cos:844, gm:74, gmp:8.1, oh:22, ebitda:53, ep:5.7, intc:0, dep:0, pbt:53, pat:39, fy26:{rev:704, cos:665, gm:39, gmp:5.5, oh:15, pbt:25, pat:19}},
      {seg:'1 Sobha', rev:527, cos:145, gm:383, gmp:72.6, oh:6, ebitda:377, ep:71.4, intc:15, dep:60, pbt:302, pat:226, fy26:{rev:407, cos:82, gm:325, gmp:79.8, oh:3, intc:0, dep:58, pbt:264, pat:197}},
      {seg:'Sobha City Mall', rev:369, cos:171, gm:198, gmp:53.7, oh:14, ebitda:185, ep:50.0, intc:0, dep:28, pbt:156, pat:117, fy26:{rev:348, cos:157, gm:191, gmp:54.8, oh:8, intc:0, dep:28, pbt:155, pat:101}},
      {seg:'Lake View Club', rev:19, cos:10, gm:9, gmp:48.2, oh:2, ebitda:7, ep:39.0, intc:0, dep:2, pbt:5, pat:4, fy26:{rev:19, cos:9, gm:10, gmp:55.1, oh:1, intc:0, dep:2, pbt:7, pat:6}},
      {seg:'ICG Club', rev:16, cos:6, gm:10, gmp:65.2, oh:4, ebitda:6, ep:39.9, intc:0, dep:28, pbt:-22, pat:-16, fy26:{rev:15, cos:4, gm:11, gmp:71.1, oh:3, intc:0, dep:31, pbt:-23, pat:-17}},
      {seg:'Sobha Arcadia', rev:3, cos:1, gm:3, gmp:79.8, oh:1, ebitda:2, ep:50.6, intc:0, dep:20, pbt:-18, pat:-13, fy26:{rev:0, cos:0, gm:0, gmp:0, oh:0, pbt:0, pat:0}},
      {seg:'Civil', rev:938, cos:699, gm:239, gmp:25.5, oh:21, ebitda:218, ep:23.2, intc:0, dep:4, pbt:213, pat:160, fy26:{rev:828, cos:1081, gm:-254, gmp:-30.7, oh:21, intc:0, dep:87, pbt:-361, pat:-270}},
      {seg:'Electrical', rev:850, cos:729, gm:121, gmp:14.2, oh:45, ebitda:76, ep:9.0, intc:0, dep:0, pbt:76, pat:57, fy26:{rev:713, cos:635, gm:78, gmp:10.9, oh:38, pbt:40, pat:30}},
      {seg:'PHE', rev:552, cos:457, gm:95, gmp:17.2, oh:34, ebitda:60, ep:10.9, intc:0, dep:0, pbt:60, pat:45, fy26:{rev:623, cos:382, gm:241, gmp:38.7, oh:27, pbt:214, pat:160}},
      {seg:'Glazing', rev:1867, cos:1396, gm:471, gmp:25.2, oh:165, ebitda:306, ep:16.4, intc:1, dep:31, pbt:274, pat:205, fy26:{rev:1918, cos:1543, gm:375, gmp:19.5, oh:129, intc:1, dep:13, pbt:233, pat:174}},
      {seg:'Interiors', rev:1050, cos:760, gm:290, gmp:27.6, oh:112, ebitda:179, ep:17.0, intc:1, dep:80, pbt:98, pat:73, fy26:{rev:759, cos:698, gm:61, gmp:8.0, oh:78, intc:1, dep:45, pbt:-63, pat:-47}},
      {seg:'Concrete Products', rev:733, cos:438, gm:295, gmp:40.2, oh:41, ebitda:254, ep:34.7, intc:0, dep:44, pbt:210, pat:157, fy26:{rev:986, cos:595, gm:390, gmp:39.6, oh:31, intc:0, dep:36, pbt:323, pat:241}},
      {seg:'Mattress', rev:184, cos:137, gm:47, gmp:25.3, oh:34, ebitda:13, ep:6.8, intc:0, dep:5, pbt:7, pat:6, fy26:{rev:134, cos:97, gm:36, gmp:27.3, oh:40, intc:0, dep:5, pbt:-9, pat:-7}},
      {seg:'metercube', rev:356, cos:174, gm:182, gmp:51.1, oh:159, ebitda:23, ep:6.4, intc:5, dep:5, pbt:13, pat:9, fy26:{rev:252, cos:125, gm:127, gmp:50.4, oh:155, intc:4, dep:5, pbt:-37, pat:-27}},
      {seg:'Land Sales', rev:0, cos:0, gm:0, gmp:0, oh:0, ebitda:0, ep:0, intc:0, dep:0, pbt:0, pat:0, fy26:{rev:-189, cos:-203, gm:14, gmp:-7.5, oh:0, pbt:14, pat:11}},
      {seg:'Others (Contracts)', rev:0, cos:0, gm:0, gmp:0, oh:0, ebitda:0, ep:0, intc:0, dep:0, pbt:0, pat:0, fy26:{rev:18, cos:0, gm:18, gmp:100, oh:0, pbt:18, pat:13}},
      {seg:'Notional Income', rev:200, cos:200, gm:0, gmp:0, oh:0, ebitda:0, ep:0, intc:0, dep:0, pbt:0, pat:0, fy26:{rev:176, cos:176, gm:0, gmp:0, oh:0, pbt:0, pat:0}},
      {seg:'Interest on FD', rev:860, cos:0, gm:860, gmp:100, oh:0, ebitda:860, ep:100, intc:0, dep:0, pbt:860, pat:644, fy26:{rev:945, cos:0, gm:945, gmp:100, oh:0, pbt:945, pat:707}},
      {seg:'Others (Finance)', rev:0, cos:0, gm:0, gmp:0, oh:0, ebitda:0, ep:0, intc:0, dep:0, pbt:0, pat:0, fy26:{rev:634, cos:27, gm:606, gmp:95.7, oh:0, pbt:606, pat:454}}
    ],

    segQ: {
      'RE Residential':  {q1:{rev:11892,cos:9143}, q2:{rev:7559,cos:5340},  q3:{rev:12736,cos:9022},  q4:{rev:18056,cos:11272}},
      'RE Gross Accounting':  {q1:{rev:1451, cos:1414}, q2:{rev:1626,cos:1535},  q3:{rev:1735, cos:1697},  q4:{rev:1857, cos:1766}},
      'RE DM':           {q1:{rev:327,  cos:306},  q2:{rev:327, cos:306},   q3:{rev:327,  cos:306},   q4:{rev:327,  cos:306}},
      'FMD':             {q1:{rev:230,  cos:211},  q2:{rev:230, cos:211},   q3:{rev:230,  cos:211},   q4:{rev:230,  cos:211}},
      'RE Other income':    {q1:{rev:88,   cos:68},   q2:{rev:88,  cos:118},   q3:{rev:88,   cos:168},   q4:{rev:88,   cos:318}},
      'Land Sales':      {q1:{rev:0,    cos:0},    q2:{rev:0,   cos:0},     q3:{rev:0,    cos:0},     q4:{rev:0,    cos:0}}
    },
    reGroupQ: {
      q1:{rev:13987, cos:11141, gm:2846, gmp:20.3, oh:2860, pbt:-14,   pat:-10},
      q2:{rev:9830,  cos:7510,  gm:2319, gmp:23.6, oh:2532, pbt:-212,  pat:-159},
      q3:{rev:15115, cos:11403, gm:3712, gmp:24.6, oh:3143, pbt:568,   pat:425},
      q4:{rev:20557, cos:13873, gm:6685, gmp:32.5, oh:3414, pbt:3271,  pat:2447}
    },
    // Revenue / Cost breakdowns by segment (Page 37+) — used by drill-down drawer
    breakdowns: {
      'RE Residential': {
        oh: [
          ['Brokerage', 1761],
          ['Marketing', 2047],
          ['Incentive', 1351],
          ['General Overheads', 3523],
          ['Depreciation', 528],
          ['Finance Cost', 1232],
          ['Finance Cost — Inventorisation Impact', 1078],
          ['Allocated COH', 408]
        ]
      },
      '__re:q1': {
        oh: [
          ['Brokerage', 451],
          ['Marketing', 321],
          ['Incentive', 363],
          ['General Overheads', 805],
          ['Depreciation', 111],
          ['Finance Cost', 300],
          ['Finance Cost — Inventorisation Impact', 366],
          ['Allocated COH', 141]
        ]
      },
      '1 Sobha': {
        rev: [['Lease Rent',341],['Revenue Share',26],['CAM',63],['Utilities',35],['Others',63]],
        cos: [['Security Service Charges',9],['Electricity Charges',42],['Rent',15],['Property Tax',12],['Wages — Housekeeping & Others',5],['Other Maintenance',61]],
        oh:  [['Employee Cost',3],['IT Expenses',2],['Admin Expenses',1],['Interest',15],['Depreciation',60]]
      },
      'Sobha City Mall': {
        rev: [['Lease Rent',172],['Revenue Share',17],['CAM',83],['Utilities',82],['Others',14]],
        cos: [['Security Service Charges',13],['Electricity Charges',75],['Rent',0],['Property Tax',3],['Wages — Housekeeping & Others',17],['Other Maintenance',63]],
        oh:  [['Employee Cost',9],['IT Expenses',3],['Admin Expenses',2],['Interest',0],['Depreciation',28]]
      },
      'Lake View Club': {
        rev: [['Lease Rent',5],['Revenue Share',0],['CAM',0],['Utilities',0],['Others',14]],
        cos: [['Security Service Charges',1],['Electricity Charges',0],['Rent',0],['Property Tax',1],['Wages — Housekeeping & Others',3],['Other Maintenance',5]],
        oh:  [['Employee Cost',1],['IT Expenses',1],['Admin Expenses',0],['Interest',0],['Depreciation',2]]
      },
      'ICG Club': {
        rev: [['Lease Rent',16],['Revenue Share',0],['CAM',0],['Utilities',0],['Others',0]],
        cos: [['Security Service Charges',2],['Electricity Charges',1],['Rent',0],['Property Tax',0],['Wages — Housekeeping & Others',0],['Other Maintenance',2]],
        oh:  [['Employee Cost',4],['IT Expenses',0],['Admin Expenses',0],['Interest',0],['Depreciation',28]]
      },
      'Sobha Arcadia': {
        rev: [['Lease Rent',3],['Revenue Share',0],['CAM',0],['Utilities',0],['Others',0]],
        cos: [['Security Service Charges',0],['Electricity Charges',0],['Rent',0],['Property Tax',0],['Wages — Housekeeping & Others',0],['Other Maintenance',1]],
        oh:  [['Employee Cost',0],['IT Expenses',0],['Admin Expenses',0],['Interest',0],['Depreciation',20]]
      },
      'Civil': {
        rev: [['Billing',938]],
        cos: [['Material Consumed',425],['Subcontractor & Other Charges',275]],
        oh:  [['Employee Cost',20],['IT Expenses',0],['Admin Expenses',0],['Other Expenses',1],['Interest',0],['Depreciation',4]]
      },
      'PHE': {
        rev: [['Billing',552]],
        cos: [['Material Consumed',376],['Subcontractor & Other Charges',81]],
        oh:  [['Employee Cost',30],['IT Expenses',0],['Admin Expenses',5],['Other Expenses',0],['Interest',0],['Depreciation',0]]
      },
      'Electrical': {
        rev: [['Billing',850]],
        cos: [['Material Consumed',544],['Subcontractor & Other Charges',185]],
        oh:  [['Employee Cost',40],['IT Expenses',1],['Admin Expenses',3],['Other Expenses',0],['Interest',0],['Depreciation',0]]
      },
      'FMD': {
        rev: [['Monthly Billing',919]],
        cos: [['Monthly Expenses',844]],
        oh:  [['Salaries',19],['Other Expenses',3],['Interest',0],['Depreciation',0]]
      },
      'Glazing': {
        rev: [['Opening Unbilled / (Unearned)',333],['External Sales',2200],['Inter-Division Sales',1200]],
        cos: [['Material Consumed',1827],['Subcontractor & Other Charges',769]],
        oh:  [['Marketing & Incentive',0],['Employee Cost',62],['IT Expenses',2],['Admin Expenses',41],['Other Expenses',30],['Allocated COH',30],['Interest',1],['Depreciation',31]]
      },
      'Concrete Products': {
        rev: [['External Sales',733],['Inter-Division Sales',671]],
        cos: [['Material Consumed',600],['Subcontractor & Other Charges',510]],
        oh:  [['Employee Cost',15],['IT Expenses',1],['Admin Expenses',9],['Other Expenses',0],['Allocated COH',16],['Interest',0],['Depreciation',44]]
      },
      'Interiors': {
        rev: [['External Sales',1050],['Inter-Division Sales',600]],
        cos: [['Material Consumed',968],['Subcontractor & Other Charges',392]],
        oh:  [['Employee Cost',81],['IT Expenses',5],['Admin Expenses',24],['Other Expenses',1],['Allocated COH',0],['Interest',1],['Depreciation',80]]
      },
      'Mattress': {
        rev: [['External Sales',184],['Inter-Division Sales',0]],
        cos: [['Material Consumed',86],['Subcontractor & Other Charges',51]],
        oh:  [['Marketing & Incentive',0],['Employee Cost',22],['IT Expenses',1],['Admin Expenses',8],['Other Expenses',0],['Allocated COH',3],['Interest',0],['Depreciation',5]]
      },
      'metercube': {
        rev: [['External Sales',356],['Inter-Division Sales',0]],
        cos: [['Material Consumed',169],['Subcontractor & Other Charges',5]],
        oh:  [['Marketing & Incentive',13],['Employee Cost',87],['IT Expenses',5],['Admin Expenses',55],['Other Expenses',0],['Allocated COH',0],['Interest',5],['Depreciation',5]]
      }
    },
    // RE quarterly P&L (Page 31)
    reQ: [
      {q:'Q1', rev:13987, cos:11141, gm:2846, gmp:20.3, brk:451, ind:2005, dep:0, pbt:-14, pat:-10},
      {q:'Q2', rev:9830, cos:7510, gm:2319, gmp:23.6, brk:330, ind:2189, dep:0, pbt:-212, pat:-159},
      {q:'Q3', rev:15115, cos:11403, gm:3712, gmp:24.6, brk:449, ind:2523, dep:0, pbt:568, pat:425},
      {q:'Q4', rev:20557, cos:13873, gm:6685, gmp:32.5, brk:531, ind:2787, dep:0, pbt:3271, pat:2447}
    ],
    // Project margin drill (Page 32-35) — actuals from biz-plan
    projMargin: [
      {city:'Bangalore', n:'Sobha Brooklyn Towers (3 wings)', wt:'Q1–Q2', oc:'Q3–Q4', units:418, sba:518999, real:28050, sale:4804, rev:3697, dc:2566, gm:1132, gmp:30.6, brk:52, fc:27, coh:17, pbt:1036, pp:28.0, wings:[
        {n:'TP P1 Wing 1',wt:'Sep-26',oc:'Nov-26',units:99,sba:201408,real:9748,sale:1963,rev:1510,dc:996,gm:514,gmp:34.1,brk:18,fc:0,coh:3,pbt:493,pp:32.6},
        {n:'TP P5 Wing 3',wt:'May-26',oc:'Jul-26',units:259,sba:195526,real:8261,sale:1615,rev:1244,dc:966,gm:278,gmp:22.4,brk:23,fc:16,coh:12,pbt:227,pp:18.3},
        {n:'TP P2 Wing 2',wt:'Jan-27',oc:'Mar-27',units:60,sba:122065,real:10042,sale:1226,rev:943,dc:604,gm:339,gmp:36.0,brk:11,fc:11,coh:1,pbt:316,pp:33.5}
      ]},
      {city:'Bangalore', n:'Sobha Manhattan (4 wings)', wt:'Q3', oc:'FY28', units:270, sba:419417, real:33217, sale:3628, rev:2792, dc:2015, gm:777, gmp:27.8, brk:41, fc:13, coh:14, pbt:710, pp:25.4, wings:[
        {n:'TP P2 Wing 2',wt:'Oct-26',oc:'Dec-26',units:130,sba:194867,real:8838,sale:1722,rev:1325,dc:931,gm:395,gmp:29.8,brk:19,fc:6,coh:5,pbt:365,pp:27.5},
        {n:'TP P2 Wing 1',wt:'Dec-26',oc:'Feb-27',units:110,sba:178759,real:8608,sale:1539,rev:1184,dc:870,gm:315,gmp:26.6,brk:16,fc:5,coh:4,pbt:289,pp:24.4},
        {n:'TP P1 Wing 4',wt:'Completed',oc:'Received',units:21,sba:31478,real:8237,sale:259,rev:200,dc:148,gm:51,gmp:25.6,brk:4,fc:1,coh:3,pbt:42,pp:21.1},
        {n:'TP P1 Wing 5',wt:'Completed',oc:'Received',units:9,sba:14312,real:7534,sale:108,rev:83,dc:66,gm:17,gmp:20.3,brk:1,fc:1,coh:2,pbt:14,pp:16.3}
      ]},
      {city:'Bangalore', n:'Sobha Dream Acres (2 wings)', wt:'Done', oc:'Q2', units:209, sba:209643, real:8342, sale:1749, rev:1749, dc:1320, gm:429, gmp:24.5, brk:21, fc:125, coh:7, pbt:276, pp:15.8, wings:[
        {n:'TG P21 Wing 22',wt:'Completed',oc:'May-26',units:120,sba:120377,real:8295,sale:999,rev:999,dc:758,gm:241,gmp:24.1,brk:12,fc:72,coh:4,pbt:153,pp:15.3},
        {n:'TG P21 Wing 21',wt:'Completed',oc:'May-26',units:89,sba:89266,real:8404,sale:750,rev:750,dc:562,gm:188,gmp:25.1,brk:9,fc:53,coh:3,pbt:123,pp:16.4}
      ]},
      {city:'Bangalore', n:'Sobha Royal Crest (3 wings)', wt:'Q3', oc:'Q4–FY28', units:320, sba:635978, real:10457, sale:6651, rev:4185, dc:3106, gm:1080, gmp:25.8, brk:92, fc:230, coh:28, pbt:730, pp:17.4, wings:[
        {n:'Wing 2',wt:'Nov-26',oc:'Jan-27',units:100,sba:205006,real:10367,sale:2125,rev:1338,dc:997,gm:341,gmp:25.5,brk:26,fc:74,coh:9,pbt:232,pp:17.4},
        {n:'Wing 1',wt:'Aug-26',oc:'Oct-26',units:110,sba:215513,real:10506,sale:2264,rev:1425,dc:1052,gm:372,gmp:26.1,brk:28,fc:78,coh:10,pbt:258,pp:18.1},
        {n:'Wing 3',wt:'Apr-26',oc:'Jun-26',units:110,sba:215459,real:10494,sale:2261,rev:1423,dc:1056,gm:366,gmp:25.7,brk:39,fc:78,coh:10,pbt:240,pp:16.9}
      ]},
      {city:'Bangalore', n:'Sobha Dream Garden (7 wings)', wt:'Done', oc:'Q1–Q2', units:298, sba:275636, real:9607, sale:2648, rev:1826, dc:1526, gm:300, gmp:16.4, brk:40, fc:38, coh:16, pbt:206, pp:11.3, wings:[
        {n:'P4 W2',wt:'Completed',oc:'Received',units:134,sba:134332,real:9458,sale:1271,rev:876,dc:624,gm:253,gmp:28.8,brk:19,fc:13,coh:8,pbt:212,pp:24.2},
        {n:'P5 W10',wt:'Aug-26',oc:'Oct-26',units:140,sba:117319,real:9885,sale:1160,rev:800,dc:809,gm:-9,gmp:-1.1,brk:18,fc:21,coh:6,pbt:-54,pp:-6.8},
        {n:'P4 W1',wt:'Completed',oc:'Received',units:17,sba:17104,real:9392,sale:161,rev:111,dc:63,gm:48,gmp:43.4,brk:2,fc:2,coh:1,pbt:43,pp:38.8},
        {n:'P3 W3',wt:'Completed',oc:'Received',units:3,sba:3026,real:8865,sale:27,rev:19,dc:14,gm:4,gmp:23.0,brk:1,fc:1,coh:0,pbt:3,pp:15.9},
        {n:'P3 W4',wt:'Completed',oc:'Received',units:2,sba:2117,real:8890,sale:19,rev:13,dc:10,gm:3,gmp:23.2,brk:0,fc:0,coh:0,pbt:2,pp:18.3},
        {n:'P2 W6',wt:'Completed',oc:'Received',units:1,sba:1059,real:6499,sale:7,rev:5,dc:4,gm:1,gmp:16.4,brk:0,fc:0,coh:0,pbt:0,pp:2.1},
        {n:'P2 W5',wt:'Completed',oc:'Received',units:1,sba:679,real:6530,sale:4,rev:3,dc:2,gm:0,gmp:16.8,brk:0,fc:0,coh:0,pbt:0,pp:-2.9}
      ]},
      {city:'Bangalore', n:'Sobha Sentosa (5 wings)', wt:'Done', oc:'Q1', units:43, sba:68630, real:9399, sale:645, rev:529, dc:425, gm:104, gmp:19.7, brk:16, fc:5, coh:3, pbt:81, pp:15.3, wings:[
        {n:'P4 W1',wt:'Completed',oc:'Received',units:30,sba:50697,real:9480,sale:481,rev:384,dc:315,gm:69,gmp:18.1,brk:11,fc:3,coh:2,pbt:53,pp:13.7},
        {n:'P3 W3',wt:'Completed',oc:'Received',units:1,sba:1730,real:9340,sale:16,rev:16,dc:12,gm:4,gmp:26.9,brk:0,fc:0,coh:0,pbt:4,pp:24.5},
        {n:'P3 W4',wt:'Completed',oc:'Received',units:3,sba:2040,real:8339,sale:17,rev:17,dc:14,gm:3,gmp:18.1,brk:0,fc:0,coh:0,pbt:2,pp:14.1},
        {n:'P2 W6',wt:'Completed',oc:'Received',units:2,sba:3609,real:9066,sale:33,rev:33,dc:23,gm:10,gmp:31.1,brk:1,fc:0,coh:0,pbt:9,pp:26.1},
        {n:'P4 W2',wt:'Completed',oc:'Received',units:7,sba:10553,real:9336,sale:99,rev:79,dc:62,gm:17,gmp:21.6,brk:3,fc:1,coh:0,pbt:13,pp:16.9}
      ]},
      {city:'Bangalore', n:'Sobha Royal Pavilion (4 wings)', wt:'Done', oc:'Q2', units:27, sba:47570, real:7846, sale:373, rev:262, dc:278, gm:-16, gmp:-6.1, brk:5, fc:7, coh:6, pbt:-34, pp:-12.9, wings:[
        {n:'P7 W14',wt:'Completed',oc:'Received',units:21,sba:34525,real:7604,sale:263,rev:185,dc:222,gm:-37,gmp:-20.2,brk:3,fc:5,coh:5,pbt:-50,pp:-27.1},
        {n:'P8 W15',wt:'Completed',oc:'Received',units:5,sba:11161,real:8621,sale:96,rev:67,dc:44,gm:23,gmp:34.4,brk:2,fc:1,coh:1,pbt:19,pp:28.2},
        {n:'P7 W13',wt:'Completed',oc:'Received',units:1,sba:1884,real:7678,sale:14,rev:10,dc:12,gm:-2,gmp:-19.0,brk:0,fc:0,coh:0,pbt:-3,pp:-25.7},
        {n:'P6 W10',wt:'Completed',oc:'Received',units:0,sba:0,real:0,sale:0,rev:0,dc:0,gm:0,gmp:0,brk:0,fc:0,coh:0,pbt:0,pp:0}
      ]},
      {city:'Bangalore', n:'Sobha Oakshire (2 wings)', wt:'Q1', oc:'Q3', units:45, sba:154944, real:14573, sale:2258, rev:1813, dc:1122, gm:690, gmp:38.1, brk:33, fc:14, coh:8, pbt:636, pp:35.1, wings:[
        {n:'Phase 1 (W 1,2,7,8)',wt:'Jun-26',oc:'Aug-26',units:30,sba:103296,real:14573,sale:1505,rev:1208,dc:746,gm:463,gmp:38.3,brk:21,fc:9,coh:6,pbt:427,pp:35.3},
        {n:'Phase 2 (W 3,4,9,10)',wt:'Dec-26',oc:'Feb-27',units:15,sba:51648,real:14575,sale:753,rev:604,dc:376,gm:228,gmp:37.7,brk:11,fc:5,coh:3,pbt:209,pp:34.6}
      ]},
      {city:'Bangalore', n:'Sobha Victoria Park (7 wings)', wt:'Q1–Q3', oc:'Q3–Q4', units:150, sba:269489, real:9050, sale:2439, rev:2094, dc:1523, gm:571, gmp:27.3, brk:39, fc:21, coh:16, pbt:496, pp:23.7, wings:[
        {n:'P1 Wing 5',wt:'Oct-26',oc:'Dec-26',units:58,sba:103477,real:9138,sale:946,rev:814,dc:588,gm:225,gmp:27.7,brk:16,fc:8,coh:6,pbt:196,pp:24.1},
        {n:'P1 Wing 3',wt:'May-26',oc:'FY28',units:57,sba:102459,real:8861,sale:908,rev:781,dc:568,gm:214,gmp:27.4,brk:12,fc:8,coh:6,pbt:188,pp:24.1},
        {n:'P1 Wing 4',wt:'Completed',oc:'Received',units:18,sba:31605,real:8888,sale:281,rev:242,dc:188,gm:54,gmp:22.4,brk:4,fc:3,coh:2,pbt:46,pp:18.9},
        {n:'P1 Wing 2',wt:'Completed',oc:'Received',units:8,sba:14257,real:8757,sale:125,rev:107,dc:79,gm:28,gmp:26.2,brk:1,fc:1,coh:1,pbt:25,pp:23.1},
        {n:'P2 Wing 6',wt:'Completed',oc:'Received',units:1,sba:2655,real:13491,sale:36,rev:29,dc:15,gm:13,gmp:47.3,brk:1,fc:0,coh:0,pbt:12,pp:42.7},
        {n:'P1 Wing 1',wt:'Completed',oc:'Received',units:7,sba:12370,real:8698,sale:108,rev:93,dc:70,gm:23,gmp:24.5,brk:5,fc:1,coh:1,pbt:16,pp:17.8},
        {n:'P2 Wing 7',wt:'Completed',oc:'Received',units:1,sba:2665,real:13648,sale:36,rev:29,dc:15,gm:14,gmp:47.9,brk:1,fc:0,coh:0,pbt:12,pp:42.4}
      ]},
      {city:'Bangalore', n:'Sobha Neopolis (7 wings)', wt:'Q2–Q4', oc:'Q4–FY28', units:567, sba:812927, real:13214, sale:10742, rev:10742, dc:4422, gm:6320, gmp:58.8, brk:107, fc:59, coh:0, pbt:6154, pp:57.3, wings:[
        {n:'P1 Wing 17',wt:'Sep-26',oc:'Nov-26',units:105,sba:190546,real:12733,sale:2426,rev:2426,dc:1055,gm:1372,gmp:56.5,brk:11,fc:9,coh:0,pbt:1351,pp:55.7},
        {n:'P5 Wing 7',wt:'Dec-26',oc:'Feb-27',units:95,sba:172022,real:13612,sale:2342,rev:2342,dc:874,gm:1467,gmp:62.7,brk:35,fc:14,coh:0,pbt:1418,pp:60.6},
        {n:'P1 Wing 16',wt:'Jan-27',oc:'Mar-27',units:75,sba:136104,real:12929,sale:1760,rev:1760,dc:753,gm:1007,gmp:57.2,brk:13,fc:11,coh:0,pbt:983,pp:55.9},
        {n:'P1 Wing 18',wt:'Jul-26',oc:'Sep-26',units:52,sba:128528,real:13438,sale:1727,rev:1727,dc:712,gm:1016,gmp:58.8,brk:20,fc:11,coh:0,pbt:985,pp:57.0},
        {n:'P1 Wing 14',wt:'Oct-26',oc:'Dec-26',units:111,sba:73338,real:13242,sale:971,rev:971,dc:406,gm:565,gmp:58.2,brk:11,fc:7,coh:0,pbt:547,pp:56.3},
        {n:'P1 Wing 19',wt:'Feb-27',oc:'FY28',units:15,sba:37069,real:13607,sale:504,rev:504,dc:205,gm:299,gmp:59.3,brk:3,fc:3,coh:0,pbt:293,pp:58.2},
        {n:'P1 Wing 15',wt:'Oct-26',oc:'Dec-26',units:114,sba:75320,real:13428,sale:1011,rev:1011,dc:417,gm:595,gmp:58.8,brk:13,fc:6,coh:0,pbt:576,pp:57.0}
      ]},
      {city:'Bangalore', n:'Sobha Galera (2 wings)', wt:'Q1', oc:'Q3', units:16, sba:53777, real:15153, sale:815, rev:815, dc:419, gm:396, gmp:48.5, brk:25, fc:13, coh:5, pbt:353, pp:43.3, wings:[
        {n:'Wing 1',wt:'Completed',oc:'Received',units:10,sba:33709,real:14979,sale:505,rev:505,dc:265,gm:240,gmp:47.5,brk:13,fc:8,coh:3,pbt:216,pp:42.7},
        {n:'Wing 2',wt:'Completed',oc:'Received',units:6,sba:20068,real:15446,sale:310,rev:310,dc:154,gm:156,gmp:50.3,brk:12,fc:5,coh:2,pbt:138,pp:44.4}
      ]},
      {city:'Bangalore', n:'Sobha Windsor Phase 3 (3 wings)', wt:'Done', oc:'Received', units:3, sba:5438, real:7993, sale:43, rev:43, dc:27, gm:17, gmp:38.9, brk:1, fc:1, coh:0, pbt:15, pp:33.6, wings:[
        {n:'Ph 3 Wing 6',wt:'Completed',oc:'Received',units:1,sba:1811,real:7658,sale:14,rev:14,dc:9,gm:5,gmp:35.8,brk:0,fc:0,coh:0,pbt:4,pp:28.9},
        {n:'Ph 4 Wing 9',wt:'Completed',oc:'Received',units:2,sba:3627,real:8161,sale:30,rev:30,dc:18,gm:12,gmp:40.3,brk:0,fc:1,coh:0,pbt:11,pp:35.9},
        {n:'Ph 4 Wing 11',wt:'Completed',oc:'Received',units:0,sba:0,real:0,sale:0,rev:0,dc:0,gm:0,gmp:0,brk:0,fc:0,coh:0,pbt:0,pp:0}
      ]},
      {city:'Bangalore', n:'Sobha Lake Gardens (3 twr)', wt:'Done', oc:'Received', units:3, sba:4184, real:6401, sale:27, rev:19, dc:19, gm:0, gmp:-2.0, brk:0, fc:0, coh:0, pbt:-1, pp:-7.3, wings:[
        {n:'P2 Tower 1B',wt:'Completed',oc:'Received',units:1,sba:769,real:6464,sale:5,rev:4,dc:4,gm:0,gmp:-0.3,brk:0,fc:0,coh:0,pbt:0,pp:-4.7},
        {n:'P2 Tower 02',wt:'Completed',oc:'Received',units:1,sba:1707,real:6377,sale:11,rev:8,dc:8,gm:0,gmp:-2.6,brk:0,fc:0,coh:0,pbt:-1,pp:-9.1},
        {n:'P2 Tower 04',wt:'Completed',oc:'Received',units:1,sba:1707,real:6396,sale:11,rev:8,dc:8,gm:0,gmp:-2.2,brk:0,fc:0,coh:0,pbt:-1,pp:-6.7}
      ]},
      {city:'Bangalore', n:'Sobha City Athena W1', wt:'Completed', oc:'May-26', units:72, sba:121606, real:8240, sale:1002, rev:1002, dc:960, gm:43, gmp:4.2, brk:14, fc:69, coh:22, pbt:-63, pp:-6.3},
      {city:'Bangalore', n:'Sobha Insignia W1', wt:'Apr-26', oc:'May-26', units:8, sba:19455, real:14825, sale:288, rev:288, dc:132, gm:157, gmp:54.3, brk:3, fc:0, coh:2, pbt:152, pp:52.7},
      {city:'Bangalore', n:'Sobha Valley View - Heritage 2', wt:'Completed', oc:'Received', units:1, sba:1543, real:11306, sale:17, rev:17, dc:8, gm:10, gmp:54.9, brk:0, fc:0, coh:0, pbt:10, pp:54.7},
      {city:'Bangalore', n:'Sobha Lifestyle Phase 2', wt:'Completed', oc:'Received', units:1, sba:7503, real:7583, sale:57, rev:57, dc:76, gm:-19, gmp:-33.3, brk:1, fc:0, coh:0, pbt:-20, pp:-34.9},
      {city:'Bangalore', n:'Sobha Rajvilas W1', wt:'Completed', oc:'Received', units:3, sba:5977, real:10017, sale:60, rev:60, dc:53, gm:6, gmp:10.8, brk:1, fc:4, coh:2, pbt:0, pp:0.1},
      {city:'Bangalore', n:'Sobha Palm Court', wt:'Completed', oc:'Received', units:1, sba:1934, real:6484, sale:13, rev:10, dc:8, gm:2, gmp:19.0, brk:0, fc:0, coh:0, pbt:2, pp:15.4},
      {city:'Gurgaon', n:'Sobha City Gurgaon Ph-6 (5 twrs)', wt:'Q2–Q4', oc:'FY28', units:231, sba:575002, real:14941, sale:8591, rev:5247, dc:4319, gm:927, gmp:17.7, brk:144, fc:533, coh:33, pbt:218, pp:4.1, wings:[
        {n:'Ph-6 Tower D1',wt:'FY28',oc:'May-26',units:72,sba:174919,real:14538,sale:2543,rev:1553,dc:1250,gm:303,gmp:19.5,brk:42,fc:154,coh:10,pbt:97,pp:6.2},
        {n:'Ph-6 Tower D2',wt:'Aug-26',oc:'Sep-26',units:72,sba:174533,real:14838,sale:2590,rev:1582,dc:1248,gm:333,gmp:21.1,brk:43,fc:153,coh:10,pbt:128,pp:8.1},
        {n:'Ph-6 Tower Z2',wt:'Jan-27',oc:'Feb-27',units:39,sba:101240,real:15540,sale:1573,rev:961,dc:807,gm:153,gmp:16.0,brk:25,fc:101,coh:6,pbt:21,pp:2.2},
        {n:'Ph-6 Tower Z1',wt:'Oct-26',oc:'Nov-26',units:48,sba:124310,real:15165,sale:1885,rev:1151,dc:1014,gm:138,gmp:12.0,brk:34,fc:125,coh:8,pbt:-29,pp:-2.5},
        {n:'Ph-6 Tower D4',wt:'FY28',oc:'FY28',units:0,sba:0,real:0,sale:0,rev:0,dc:0,gm:0,gmp:0,brk:0,fc:0,coh:0,pbt:0,pp:0}
      ]},
      {city:'Gurgaon', n:'International City (3 vil)', wt:'Done', oc:'Q1', units:10, sba:42082, real:10361, sale:436, rev:436, dc:280, gm:156, gmp:35.9, brk:10, fc:9, coh:21, pbt:117, pp:26.8, wings:[
        {n:'IC – E',wt:'Completed',oc:'Received',units:5,sba:20341,real:10606,sale:216,rev:216,dc:116,gm:100,gmp:46.3,brk:6,fc:0,coh:11,pbt:82,pp:38.1},
        {n:'IC – B',wt:'Completed',oc:'Received',units:3,sba:14366,real:9632,sale:138,rev:138,dc:90,gm:49,gmp:35.2,brk:4,fc:0,coh:6,pbt:39,pp:28.3},
        {n:'IC E-Villa',wt:'Villa',oc:'Villa',units:2,sba:7375,real:11105,sale:82,rev:82,dc:74,gm:8,gmp:9.6,brk:0,fc:9,coh:4,pbt:-5,pp:-5.6}
      ]},
      {city:'Hyderabad', n:'Sobha Waterfront (2 twrs)', wt:'Q4', oc:'FY28', units:51, sba:130410, real:14625, sale:1907, rev:1907, dc:1132, gm:775, gmp:40.6, brk:14, fc:8, coh:2, pbt:751, pp:39.4, wings:[
        {n:'Tower 4',wt:'Jan-27',oc:'Feb-27',units:25,sba:75097,real:14884,sale:1118,rev:1118,dc:535,gm:583,gmp:52.1,brk:7,fc:3,coh:1,pbt:571,pp:51.1},
        {n:'Tower 3',wt:'Oct-26',oc:'Feb-27',units:26,sba:55312,real:14274,sale:790,rev:790,dc:597,gm:192,gmp:24.4,brk:7,fc:4,coh:1,pbt:180,pp:22.8}
      ]},
      {city:'Pune', n:'Sobha Nesara (2 blocks)', wt:'Done', oc:'Q2', units:33, sba:78006, real:11164, sale:871, rev:871, dc:694, gm:177, gmp:20.4, brk:7, fc:223, coh:14, pbt:-67, pp:-7.6, wings:[
        {n:'Block 3',wt:'Jan-27',oc:'Feb-27',units:28,sba:70427,real:11325,sale:798,rev:798,dc:639,gm:158,gmp:19.9,brk:6,fc:202,coh:12,pbt:-61,pp:-7.7},
        {n:'Block 1',wt:'Completed',oc:'Received',units:5,sba:7579,real:9672,sale:73,rev:73,dc:54,gm:19,gmp:25.7,brk:1,fc:22,coh:1,pbt:-5,pp:-7.2}
      ]},
      {city:'GIFT', n:'Sobha Dream Heights T2', wt:'Completed', oc:'Received', units:3, sba:3309, real:6073, sale:20, rev:20, dc:19, gm:1, gmp:5.5, brk:0, fc:3, coh:1, pbt:-2, pp:-10.5},
      {city:'Cochin', n:'Sobha Atlantis (2 blocks)', wt:'Q1–Q2', oc:'Q3–Q4', units:148, sba:342847, real:7949, sale:2725, rev:2404, dc:2343, gm:62, gmp:2.6, brk:32, fc:242, coh:68, pbt:-280, pp:-11.6, wings:[
        {n:'Phase 1 Block 4',wt:'Jun-26',oc:'Sep-26',units:81,sba:187862,real:7738,sale:1454,rev:1283,dc:1375,gm:-92,gmp:-7.2,brk:16,fc:142,coh:40,pbt:-290,pp:-22.6},
        {n:'Phase 1 Block 3',wt:'Aug-26',oc:'Nov-26',units:67,sba:154986,real:8205,sale:1272,rev:1122,dc:968,gm:154,gmp:13.7,brk:15,fc:100,coh:28,pbt:10,pp:0.9}
      ]},
      {city:'Cochin', n:'Marina One (5 wings)', wt:'Q2', oc:'Q4', units:105, sba:296744, real:9322, sale:2766, rev:1411, dc:1430, gm:-19, gmp:-1.4, brk:17, fc:217, coh:20, pbt:-274, pp:-19.4, wings:[
        {n:'East Wing 5',wt:'Jul-26',oc:'Sep-26',units:80,sba:214798,real:9263,sale:1990,rev:1015,dc:1053,gm:-38,gmp:-3.7,brk:13,fc:154,coh:13,pbt:-218,pp:-21.5},
        {n:'North Wing 2',wt:'Completed',oc:'Received',units:22,sba:72578,real:9519,sale:691,rev:352,dc:341,gm:11,gmp:3.2,brk:4,fc:56,coh:6,pbt:-55,pp:-15.7},
        {n:'North Wing 3',wt:'Completed',oc:'Received',units:1,sba:3711,real:8983,sale:33,rev:17,dc:14,gm:3,gmp:19.2,brk:0,fc:3,coh:0,pbt:0,pp:0.9},
        {n:'South Wing 12',wt:'Completed',oc:'Received',units:1,sba:2596,real:9421,sale:24,rev:12,dc:11,gm:1,gmp:11.6,brk:0,fc:2,coh:0,pbt:-1,pp:-7.5},
        {n:'East Wing 4',wt:'Completed',oc:'Received',units:1,sba:3061,real:9140,sale:28,rev:14,dc:11,gm:3,gmp:20.7,brk:0,fc:2,coh:0,pbt:0,pp:2.7}
      ]},
      {city:'Thrissur', n:'Sobha Lake Edge', wt:'Completed', oc:'Received', units:36, sba:119594, real:7637, sale:913, rev:913, dc:775, gm:138, gmp:15.2, brk:4, fc:57, coh:3, pbt:75, pp:8.2},
      {city:'Thrissur', n:'Sobha Metropolis (3 wings)', wt:'Q2–Q3', oc:'Q4', units:129, sba:283921, real:7044, sale:2000, rev:2000, dc:1454, gm:546, gmp:27.3, brk:30, fc:0, coh:0, pbt:516, pp:25.8, wings:[
        {n:'Phase I Wing 2',wt:'Aug-26',oc:'Sep-26',units:60,sba:136826,real:7156,sale:979,rev:979,dc:700,gm:279,gmp:28.5,brk:17,fc:0,coh:0,pbt:262,pp:26.7},
        {n:'Phase I Wing 3',wt:'Oct-26',oc:'Dec-26',units:45,sba:82037,real:6901,sale:566,rev:566,dc:420,gm:146,gmp:25.8,brk:6,fc:0,coh:0,pbt:140,pp:24.7},
        {n:'Phase I Wing 1',wt:'Dec-26',oc:'Jan-27',units:24,sba:65058,real:6988,sale:455,rev:455,dc:333,gm:122,gmp:26.7,brk:7,fc:0,coh:0,pbt:115,pp:25.3}
      ]},
      {city:'Trivandrum', n:'Sobha Mdws Whispering Hill (3 wings)', wt:'Q1', oc:'Q3', units:72, sba:144198, real:8976, sale:1294, rev:1294, dc:952, gm:343, gmp:26.5, brk:22, fc:21, coh:55, pbt:244, pp:18.8, wings:[
        {n:'Meadows Wing 1',wt:'Apr-26',oc:'May-26',units:48,sba:95993,real:9017,sale:866,rev:866,dc:635,gm:231,gmp:26.7,brk:16,fc:14,coh:37,pbt:164,pp:18.9},
        {n:'Meadows Wing 2',wt:'Completed',oc:'May-26',units:24,sba:48205,real:8895,sale:429,rev:429,dc:317,gm:112,gmp:26.1,brk:6,fc:7,coh:18,pbt:80,pp:18.7},
        {n:'Ridge Tower 1',wt:'FY28',oc:'FY28',units:0,sba:0,real:0,sale:0,rev:0,dc:0,gm:0,gmp:0,brk:0,fc:0,coh:0,pbt:0,pp:0}
      ]},
      {city:'Calicut', n:'Sobha Bela Encosta', wt:'Completed', oc:'Sep-26', units:4, sba:18156, real:7587, sale:138, rev:104, dc:138, gm:-34, gmp:-32.2, brk:0, fc:14, coh:4, pbt:-52, pp:-49.8},
      {city:'Chennai', n:'Sobha Arbor (7 wings)', wt:'Q1–Q2', oc:'Q3–Q4', units:130, sba:223687, real:8388, sale:1876, rev:1552, dc:1202, gm:349, gmp:22.5, brk:11, fc:74, coh:41, pbt:223, pp:14.4, wings:[
        {n:'Wing 1',wt:'Completed',oc:'Apr-26',units:20,sba:31225,real:8437,sale:263,rev:218,dc:171,gm:47,gmp:21.7,brk:1,fc:10,coh:6,pbt:30,pp:13.9},
        {n:'Wing 2',wt:'Completed',oc:'Apr-26',units:20,sba:31225,real:8441,sale:264,rev:218,dc:169,gm:49,gmp:22.3,brk:1,fc:10,coh:6,pbt:31,pp:14.4},
        {n:'Wing 3',wt:'Completed',oc:'Apr-26',units:15,sba:23419,real:8465,sale:198,rev:164,dc:124,gm:40,gmp:24.5,brk:1,fc:8,coh:4,pbt:27,pp:16.4},
        {n:'Wing 4',wt:'Completed',oc:'May-26',units:24,sba:42898,real:8121,sale:348,rev:288,dc:227,gm:61,gmp:21.3,brk:2,fc:14,coh:8,pbt:37,pp:13.0},
        {n:'Wing 5',wt:'Completed',oc:'May-26',units:23,sba:40982,real:8277,sale:339,rev:281,dc:227,gm:54,gmp:19.2,brk:3,fc:14,coh:8,pbt:30,pp:10.8},
        {n:'Wing 6',wt:'May-26',oc:'May-26',units:20,sba:36028,real:8506,sale:306,rev:253,dc:190,gm:63,gmp:24.9,brk:2,fc:12,coh:7,pbt:42,pp:16.7},
        {n:'Wing 7',wt:'Completed',oc:'Received',units:8,sba:17911,real:8767,sale:157,rev:130,dc:95,gm:35,gmp:27.1,brk:1,fc:6,coh:3,pbt:24,pp:18.9}
      ]},
      {city:'Chennai', n:'Sobha Conserve', wt:'Completed', oc:'Received', units:12, sba:24650, real:7005, sale:173, rev:70, dc:26, gm:44, gmp:62.9, brk:0, fc:0, coh:1, pbt:43, pp:61.4},
      {city:'Coimbatore', n:'Sobha Verdure', wt:'Completed', oc:'Received', units:1, sba:2196, real:6243, sale:14, rev:14, dc:12, gm:2, gmp:12.1, brk:0, fc:1, coh:0, pbt:1, pp:4.4}
    ],
        // Commercial Properties P&L (Page 37)
    commercial: [
      {asset:'1 Sobha', rev:527, leaseR:341, revShare:26, cam:63, util:35, oth:63, cost:145, gm:383, gmp:72.6, oh:6, ebitda:377, dep:60, intc:15, pbt:302, pat:226},
      {asset:'Sobha City Mall', rev:369, leaseR:172, revShare:17, cam:83, util:82, oth:14, cost:171, gm:198, gmp:53.7, oh:14, ebitda:185, dep:28, intc:0, pbt:156, pat:117},
      {asset:'Lake View', rev:19, leaseR:5, revShare:0, cam:0, util:0, oth:14, cost:10, gm:9, gmp:48.2, oh:2, ebitda:7, dep:2, intc:0, pbt:5, pat:4},
      {asset:'ICG', rev:16, leaseR:16, revShare:0, cam:0, util:0, oth:0, cost:6, gm:10, gmp:65.2, oh:4, ebitda:6, dep:28, intc:0, pbt:-22, pat:-16},
      {asset:'Sobha Arcadia', rev:3, leaseR:3, revShare:0, cam:0, util:0, oth:0, cost:1, gm:3, gmp:17.3, oh:1, ebitda:2, dep:20, intc:0, pbt:-18, pat:-13}
    ],
    // Fixed assets / Depreciation (Page 41)
    deprec: [
      {n:'Factory buildings', rate:9.5, gross:905, nbv:262, add:0, dep:25},
      {n:'Other buildings', rate:63.16, gross:1211, nbv:540, add:50, dep:357},
      {n:'Plant & machinery', rate:18.10, gross:2916, nbv:1132, add:1856, dep:373},
      {n:'Scaffolding items', rate:16.67, gross:4746, nbv:2112, add:2419, dep:554},
      {n:'Furniture & fixtures', rate:25.89, gross:129, nbv:58, add:100, dep:28},
      {n:'Vehicles', rate:31.23, gross:36, nbv:13, add:20, dep:7},
      {n:'Computers', rate:63.16, gross:473, nbv:107, add:164, dep:120},
      {n:'Office equipment', rate:45.07, gross:77, nbv:19, add:34, dep:16},
      {n:'IP Other buildings', rate:2.08, gross:4526, nbv:3855, add:0, dep:80},
      {n:'IP Plant & machinery', rate:18.10, gross:312, nbv:91, add:0, dep:16},
      {n:'Precast plant (new)', rate:3.33, gross:0, nbv:0, add:1105, dep:18},
      {n:'Aluminium factory (new)', rate:3.33, gross:0, nbv:0, add:540, dep:9},
      {n:'Rebar factory (new)', rate:3.33, gross:0, nbv:0, add:178, dep:3},
      {n:'Software', rate:33.33, gross:86, nbv:27, add:0, dep:29}
    ]
  },

  // ============== OVERHEADS (Page 43) ==============
  overheads: {
    total: {sales:181775.8, cash:109010.9, rev:68158.7, direct:2107.9, alloc:2060.8, total:4168.8, pSales:2.3, pCash:3.8, pRev:6.1},
    re: [
      {city:'Bangalore', sales:86594.8, cash:54194.2, rev:36183.8, direct:680.2, alloc:947.8, total:1628.0, pSales:1.9, pCash:3.0, pRev:4.5},
      {city:'Gurgaon', sales:42864.2, cash:19437.0, rev:8612.0, direct:194.6, alloc:469.2, total:663.8, pSales:1.5, pCash:3.4, pRev:7.7},
      {city:'Greater Noida', sales:14678.3, cash:4816.9, rev:164.1, direct:79.1, alloc:160.7, total:239.7, pSales:1.6, pCash:5.0, pRev:0},
      {city:'Mumbai', sales:5432.6, cash:859.7, rev:115.7, direct:150.5, alloc:59.5, total:210.0, pSales:3.9, pCash:24.4, pRev:0},
      {city:'Kochi', sales:5833.6, cash:6942.9, rev:5163.8, direct:78.0, alloc:63.8, total:141.9, pSales:2.4, pCash:2.0, pRev:2.7},
      {city:'Chennai', sales:2246.4, cash:693.5, rev:1905.8, direct:105.5, alloc:24.6, total:130.1, pSales:5.8, pCash:18.8, pRev:6.8},
      {city:'Thrissur', sales:2414.6, cash:2925.7, rev:2913.2, direct:90.0, alloc:26.4, total:116.4, pSales:4.8, pCash:4.0, pRev:4.0},
      {city:'Hyderabad', sales:6158.4, cash:2248.7, rev:2397.7, direct:35.1, alloc:67.4, total:102.5, pSales:1.7, pCash:4.6, pRev:4.3},
      {city:'Pune', sales:1683.2, cash:1692.2, rev:898.3, direct:66.8, alloc:18.4, total:85.2, pSales:5.1, pCash:5.0, pRev:9.5},
      {city:'Gujarat', sales:1911.2, cash:2808.7, rev:26.8, direct:32.5, alloc:20.9, total:53.4, pSales:2.8, pCash:1.9, pRev:199.5},
      {city:'Trivandrum', sales:1780.2, cash:1769.2, rev:1294.4, direct:25.9, alloc:19.5, total:45.3, pSales:2.5, pCash:2.6, pRev:3.5},
      {city:'Calicut', sales:1799.9, cash:415.1, rev:104.5, direct:17.9, alloc:19.7, total:37.6, pSales:2.1, pCash:9.0, pRev:35.9},
      {city:'Hosur', sales:0, cash:0, rev:0, direct:4.8, alloc:0, total:4.8, pSales:0, pCash:0, pRev:0}
    ],
    other: [
      {biz:'Contracts – Electrical', sales:850.0, cash:850.4, rev:850.0, direct:45.7, alloc:25.5, total:71.2, pSales:8.4, pCash:8.4, pRev:8.4},
      {biz:'Contracts – PHE', sales:551.9, cash:500.0, rev:551.9, direct:34.7, alloc:16.6, total:51.2, pSales:9.3, pCash:10.2, pRev:9.3},
      {biz:'Contracts – Civil', sales:937.8, cash:1137.4, rev:937.8, direct:20.6, alloc:28.1, total:48.8, pSales:5.2, pCash:4.3, pRev:5.2},
      {biz:'Sobha City Mall', sales:369.1, cash:425.6, rev:369.1, direct:8.6, alloc:0, total:8.6, pSales:2.3, pCash:2.0, pRev:2.3},
      {biz:'1 Sobha (One Sobha)', sales:527.4, cash:527.4, rev:527.4, direct:6.1, alloc:15.8, total:22.0, pSales:4.2, pCash:4.2, pRev:4.2},
      {biz:'ICG Club House', sales:15.8, cash:18.6, rev:15.8, direct:4.0, alloc:0.5, total:4.5, pSales:28.6, pCash:24.3, pRev:28.6},
      {biz:'Lake View Club House', sales:18.6, cash:21.9, rev:18.6, direct:7.0, alloc:0.6, total:7.6, pSales:40.9, pCash:34.6, pRev:40.9},
      {biz:'Metercube', sales:356.0, cash:420.1, rev:356.0, direct:147.1, alloc:0, total:147.1, pSales:41.3, pCash:35.0, pRev:41.3},
      {biz:'Interiors', sales:1050.0, cash:1303.8, rev:1050.0, direct:112.5, alloc:0, total:112.5, pSales:10.7, pCash:8.6, pRev:10.7},
      {biz:'Glazing', sales:1867.0, cash:2522.8, rev:1867.0, direct:82.1, alloc:30.0, total:112.1, pSales:6.0, pCash:4.4, pRev:6.0},
      {biz:'Mattress', sales:183.5, cash:216.5, rev:183.5, direct:31.3, alloc:3.0, total:34.3, pSales:18.7, pCash:15.8, pRev:18.7},
      {biz:'Concrete Products', sales:732.6, cash:864.5, rev:732.6, direct:25.0, alloc:15.4, total:40.4, pSales:5.5, pCash:4.7, pRev:5.5},
      {biz:'FMD', sales:918.8, cash:1397.9, rev:918.8, direct:22.3, alloc:27.6, total:49.9, pSales:5.4, pCash:3.6, pRev:5.4}
    ]
  }
};
