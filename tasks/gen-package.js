/*
 * Copyright 2017, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

const Utill = require('./utill/utill.js'),
	tzmap = require('../src/data/tzmap.js');

const basename = 'date-time-format-timezone';
const srcBase = "./";
const dataDir ='src/data';
const buildDir = 'build';
const browserifiedDataDir = `${buildDir}/browserified/data`;
const goldenLocales = ["en",
	"ar",
	"ca",
	"cs",
	"da",
	"de",
	"el",
	"en-AU",
	"en-CA",
	"en-GB",
	"es",
	"fi",
	"fr",
	"fr-CH",
	"he",
	"hu",
	"it",
	"ja",
	"ko",
	"nb",
	"nl",
	"pl",
	"pt",
	"pt-PT",
	"ro",
	"ru",
	"sk",
	"sl",
	"sv",
	"th",
	"tr",
	"zh",
	"zh-Hant",
	"vi",
	"hi",
	"hr",
	"sr"
];
const goldenTimeZones = [
	"Asia/Tokyo",
	"Asia/Jakarta",
	"Asia/Manila",
	"Asia/Karachi",
	"Asia/Seoul",
	"Asia/Shanghai",
	"America/New_York",
	"America/Sao_Paulo",
	"America/Mexico_City",
	"Africa/Lagos",
	"Europe/Moscow",
	"Asia/Dhaka",
	"Africa/Cairo",
	"America/Los_Angeles",
	"Asia/Bangkok",
	"Asia/Kolkata",
	"Asia/Tehran",
	"Europe/Istanbul",
	"Europe/Paris",
	"America/Lima",
	"Europe/London",
	"America/Chicago",
	"America/Bogota",
	"Asia/Ho_Chi_Minh",
	"Africa/Johannesburg",
	"Asia/Taipei",
	"Asia/Hong_Kong",
	"Asia/Kuala_Lumpur",
	"Asia/Baghdad",
	"America/Toronto",
	"America/Santiago",
	"Europe/Madrid",
	"Asia/Riyadh",
	"Asia/Singapore",
	"Africa/Khartoum",
	"Asia/Rangoon",
	"Africa/Abidjan",
	"Africa/Nairobi",
	"Asia/Kabul",
	"America/Phoenix",
	"Africa/Accra",
	"America/Monterrey",
	"Europe/Berlin",
	"Australia/Sydney",
	"Asia/Dubai",
	"Europe/Rome",
	"Australia/Melbourne",
	"America/Detroit",
	"Europe/Athens",
	"America/Fortaleza",
	"Europe/Kiev",
	"America/Recife",
	"Africa/Casablanca",
	"Asia/Urumqi",
	"America/Santo_Domingo",
	"America/Caracas",
	"Asia/Pyongyang",
	"America/Asuncion",
	"America/Guayaquil",
	"America/Bahia",
	"Europe/Lisbon",
	"Asia/Baku",
	"Africa/Maputo",
	"Africa/Algiers",
	"Asia/Damascus",
	"America/Denver",
	"Asia/Amman",
	"America/Puerto_Rico",
	"America/Port-au-Prince",
	"America/Vancouver",
	"Asia/Tashkent",
	"America/Managua",
	"Asia/Beirut",
	"Asia/Colombo",
	"America/Havana",
	"Europe/Brussels",
	"Australia/Brisbane",
	"Africa/Tunis",
	"America/Belem",
	"America/Tijuana",
	"Europe/Minsk",
	"America/La_Paz",
	"America/Manaus",
	"Europe/Bucharest",
	"Asia/Gaza",
	"Europe/Vienna",
	"Australia/Perth",
	"Europe/Warsaw",
	"Europe/Budapest",
	"America/Montevideo",
	"Europe/Amsterdam",
	"Asia/Almaty",
	"America/Panama",
	"Asia/Novosibirsk",
	"Europe/Stockholm",
	"Asia/Makassar",
	"Asia/Yekaterinburg",
	"Pacific/Auckland",
	"Europe/Prague",
	"America/Guatemala",
	"Asia/Yerevan",
	"Africa/Ndjamena",
	"Europe/Copenhagen",
	"Asia/Ulaanbaatar",
	"Europe/Helsinki",
	"Europe/Sofia",
	"Europe/Belgrade",
	"Asia/Kathmandu",
	"America/Costa_Rica",
	"Europe/Samara",
	"Europe/Dublin",
	"Asia/Omsk",
	"Australia/Adelaide",
	"Asia/Tbilisi",
	"America/Tegucigalpa",
	"America/Merida",
	"Africa/Tripoli",
	"America/El_Salvador",
	"Africa/Monrovia",
	"Asia/Tomsk",
	"America/Edmonton",
	"Europe/Volgograd",
	"Asia/Krasnoyarsk",
	"Asia/Qatar",
	"America/Jamaica",
	"America/Maceio",
	"Pacific/Fiji",
	"Asia/Bishkek",
	"Indian/Reunion",
	"America/Chihuahua",
	"Asia/Jerusalem",
	"America/Guyana",
	"America/Campo_Grande",
	"Europe/Zaporozhye",
	"Asia/Dushanbe",
	"Asia/Qyzylorda",
	"Europe/Chisinau",
	"America/Winnipeg",
	"Europe/Riga",
	"America/Hermosillo",
	"America/Cancun",
	"Europe/Oslo",
	"Asia/Irkutsk",
	"Asia/Vladivostok",
	"Asia/Sakhalin",
	"Asia/Macau",
	"Asia/Novokuznetsk",
	"Europe/Luxembourg",
	"America/Cuiaba",
	"Atlantic/Canary",
	"Europe/Vilnius",
	"Atlantic/Cape_Verde",
	"Europe/Kirov",
	"America/Matamoros",
	"America/Mazatlan",
	"Europe/Kaliningrad",
	"Europe/Malta",
	"Europe/Tirane",
	"Asia/Brunei",
	"Europe/Tallinn",
	"Asia/Ashgabat",
	"America/Halifax",
	"Africa/Bissau",
	"America/Martinique",
	"Europe/Zurich",
	"Pacific/Honolulu",
	"America/Porto_Velho",
	"Asia/Samarkand",
	"Indian/Maldives",
	"Europe/Simferopol",
	"Asia/Chita",
	"Africa/Windhoek",
	"Asia/Nicosia",
	"America/Rio_Branco",
	"America/Anchorage",
	"America/Barbados",
	"Asia/Yakutsk",
	"Asia/Aqtobe",
	"Asia/Oral",
	"Atlantic/Madeira",
	"Asia/Jayapura",
	"Pacific/Port_Moresby",
	"Asia/Hebron",
	"Pacific/Norfolk",
	"Atlantic/Azores",
	"America/Nassau",
	"America/Paramaribo",
	"Asia/Pontianak",
	"America/Boise",
	"America/Santarem",
	"Australia/Hobart",
	"Africa/El_Aaiun",
	"Asia/Dili",
	"America/Regina",
	"Asia/Kamchatka",
	"Pacific/Tahiti",
	"Pacific/Bougainville",
	"Pacific/Guam",
	"America/Curacao",
	"Asia/Aqtau",
	"Indian/Mauritius",
	"America/Araguaina",
	"Asia/Kuching",
	"Atlantic/Reykjavik",
	"Australia/Darwin",
	"Europe/Uzhgorod",
	"Pacific/Guadalcanal",
	"America/Thunder_Bay",
	"America/St_Johns",
	"Pacific/Noumea",
	"Asia/Magadan",
	"Africa/Ceuta",
	"America/Bahia_Banderas",
	"Asia/Hovd",
	"Europe/Andorra",
	"Asia/Thimphu",
	"Indian/Mahe",
	"Pacific/Tongatapu",
	"Pacific/Efate",
	"Atlantic/Bermuda",
	"America/Moncton",
	"America/Cayman",
	"America/Cayenne",
	"America/Belize",
	"Atlantic/Faroe",
	"Pacific/Chuuk",
	"America/Port_of_Spain",
	"Asia/Choibalsan",
	"Europe/Monaco",
	"Pacific/Apia",
	"Pacific/Pohnpei",
	"America/Juneau",
	"America/Eirunepe",
	"Europe/Gibraltar",
	"Pacific/Tarawa",
	"Pacific/Majuro",
	"Pacific/Galapagos",
	"America/Santa_Isabel",
	"America/Whitehorse",
	"America/Ojinaga",
	"Pacific/Palau",
	"America/Yellowknife",
	"America/Glace_Bay",
	"Australia/Broken_Hill",
	"America/Godthab",
	"America/Swift_Current",
	"Pacific/Wake",
	"Pacific/Kwajalein",
	"Pacific/Rarotonga",
	"Asia/Anadyr",
	"America/Dawson_Creek"
];

const packages = [{
	name: basename + '-no-data',
	timeZoneListType: 'none',
	localeListType: 'none'
}, {
	name: 'index',
	timeZoneListType: 'golden',
	localeListType: 'none'
}, {
	name: basename + '-all-zones-all-locale',
	timeZoneListType: 'all',
	localeListType: 'all'
}, {
	name: basename + '-all-zones-no-locale',
	timeZoneListType: 'all',
	localeListType: 'none'
}, {
	name: basename + '-golden-zones-golden-locales',
	timeZoneListType: 'golden',
	localeListType: 'golden'
}];

function getLocaleList(type) {
	const metaZone = ['data/metazone.js'];

	if (type === 'none') {
		return [];
	}
	if (type === 'all') {
		return metaZone.concat(['data/locale.js']);
	}
	return metaZone.concat(goldenLocales.map(locale => {
		return `data/locales/locale-${locale}.js`;
	}));
}

function getTimeZoneList(type) {
	if (type === 'none') {
		return [];
	}
	if (type === 'all') {
		return ['data/tzdata.js'];
	}
	return goldenTimeZones.map(tz => {
		const mappedTz = tzmap[tz];
		return `data/timezones/tzdata-${mappedTz.replace(/\//g, '-').toLowerCase()}.js`;
	});
}

function generatePackages(grunt) {
	const files = [
		srcBase + 'code/polyfill.js',
		srcBase + 'code/data-loader.js'
	];

	packages.forEach(pkg => {
		const list = files.
		concat(getLocaleList(pkg.localeListType).map(p => srcBase + p)).
		concat(getTimeZoneList(pkg.timeZoneListType).map(p => srcBase + p));

		grunt.file.write(`${buildDir}/src/${pkg.name}.js`, Utill.getPolyfillPackageModule(list));
	});
}

/**
* Returns object with filename and content for browserfied file.
* @method browserifyDataFile
* @param {String} inputFile: path of input data file
* @param {String} dataname {e.g. _localeData or _timeZoneData}
* @return {String} Returns content for file.
*/
function browserifyDataFileContent(inputFile, dataname) {
	const globalStub = {
		Intl: {}
	};

	globalStub.Intl[dataname] = {
		load: function(data) {
			this.value = data;
		}
	};

	// data- files are basically a module which calls
	// Intl._localeData.load function
	// if we pass stubbed global we get JSON in globalStub.Intl[dataname].value
	(require(inputFile)(globalStub));
	const outputJSON = globalStub.Intl[dataname].value;

	return Utill.getBrowserifiedDataFile(dataname, JSON.stringify(outputJSON));
}

/**
* Creates browserified version of data files.
* @method browserifyDataFiles
* @param {Grunt} grunt
*/
function browserifyDataFiles(grunt) {
	const dataFolders = [{
		subpath: 'locales',
		name: '_localeData',
		expand: '*.js'
	}, {
		subpath: 'timezones',
		name: '_timeZoneData',
		expand: '*.js'
	}, {
		subpath: '',
		name: '_metaZoneData',
		expand: 'metazone.js'
	}];

	dataFolders.forEach(folder => {
		const files = grunt.file.expand({
			filter: 'isFile',
			cwd: dataDir + '/' + folder.subpath
		}, folder.expand);

		files.forEach(file => {
			const inputFile = `../${dataDir}/${folder.subpath}/${file}`;
			const outputFile = `${browserifiedDataDir}/${folder.subpath}/${file}`;
			const content = browserifyDataFileContent(inputFile, folder.name);
			grunt.file.write(outputFile, content);
		});
	});
}

module.exports = function(grunt) {
	grunt.registerTask('gen-package', 'generates pre-configured packages', () => {
		generatePackages(grunt);
		browserifyDataFiles(grunt);
	});
};
