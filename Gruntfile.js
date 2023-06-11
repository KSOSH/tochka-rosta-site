module.exports = function(grunt) {
	var fs = require('fs'),
		chalk = require('chalk'),
		uniqid = function () {
			var md5 = require('md5');
			result = md5((new Date()).getTime()).toString();
			grunt.verbose.writeln("Generate hash: " + chalk.cyan(result) + " >>> OK");
			return result;
		};
	
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};
	
	var gc = {
		fontvers: "1.0.0",
		assets: "assets/templates/projectsoft",
		dist: "site/assets/templates/projectsoft",
		default: [
			//"clean",
			"concat",
			"uglify",
			//"webfont",
			"ttf2eot",
			"ttf2woff",
			"ttf2woff2",
			"imagemin",
			"tinyimg",
			"less",
			"autoprefixer",
			"group_css_media_queries",
			"replace",
			"cssmin",
			"copy",
			"pug"
		],
		less: [
			//"clean",
			"less",
			"autoprefixer",
			"group_css_media_queries",
			"replace",
			"cssmin",
			"pug"
		],
		js: [
			//"clean",
			"concat",
			"uglify",
			"copy",
			"pug"
		],
		pug: [
			//"clean",
			"pug"
		],
		images: [
			"imagemin",
			"tinyimg",
			"less",
			"autoprefixer",
			"group_css_media_queries",
			"replace",
			"cssmin",
			"pug"
		],
		fonts: [
			//"clean",
			"ttf2eot",
			"ttf2woff",
			"ttf2woff2",
			"less",
			"autoprefixer",
			"group_css_media_queries",
			"replace",
			"cssmin",
			"copy:fonts",
			"pug"
		],
		glyph: [
			//"clean",
			//"webfont",
			"ttf2eot",
			"ttf2woff",
			"ttf2woff2",
			"less",
			"autoprefixer",
			"group_css_media_queries",
			"replace",
			"cssmin",
			"copy:fonts",
			"pug"
		],
		speed: [
			//"clean",
			"less",
			"autoprefixer",
			"group_css_media_queries",
			"replace",
			"cssmin",
			"copy",
			"pug"
		]
	},
	NpmImportPlugin = require("less-plugin-npm-import");
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		clean: {
			options: {
				force: true
			},
			all: [
				'test/',
				'tests/'
			]
		},
		concat: {
			options: {
				separator: "\n",
			},
			appjs: {
				/*
					"src/js/core.js",
					"src/js/media.js",
					"src/js/guestures.js",
					"src/js/slideshow.js",
					"src/js/fullscreen.js",
					"src/js/thumbs.js",
					"src/js/hash.js",
					"src/js/wheel.js"
				*/
				src: [
					'bower_components/jquery/dist/jquery.js',
					"bower_components/fancybox/src/js/core.js",
					"bower_components/fancybox/src/js/media.js",
					"bower_components/fancybox/src/js/guestures.js",
					"bower_components/fancybox/src/js/slideshow.js",
					"bower_components/fancybox/src/js/fullscreen.js",
					"bower_components/fancybox/src/js/thumbs.js",
					"bower_components/fancybox/src/js/hash.js",
					"bower_components/fancybox/src/js/wheel.js",
					'bower_components/slick-carousel/slick/slick.js',
					'bower_components/js-cookie/src/js.cookie.js',
					'bower_components/jquery.cookie/jquery.cookie.js',
					'src/js/bvi.js'
				],
				dest: 'test/js/appjs.js'
			},
			main: {
				src: [
					//'src/js/bvi.js',
					'src/js/main.js'
				],
				dest: 'test/js/main.js'
			}
		},
		uglify: {
			options: {
				sourceMap: false,
				compress: {
					drop_console: true
				},
				output: {
					ascii_only: true
				}
			},
			app: {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'test/js/appjs.js',
							'test/js/main.js'
						],
						dest: '<%= globalConfig.dist %>/js',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + src.replace('.js', '.min.js');
						}
					}
				]
			}
		},
		/*webfont: {
			icons: {
				src: 'src/glyph/*.svg',
				dest: 'src/fonts/',
				options: {
					hashes: true,
					relativeFontPath: '@{fontpath}',
					destLess: 'src/less/fonts',
					font: 'IconsSite',
					types: 'ttf,woff,woff2',
					fontFamilyName: 'IconsSite',
					stylesheets: ['less'],
					syntax: 'bootstrap',
					execMaxBuffer: 1024 * 200,
					htmlDemo: false,
					version: gc.fontVers,
					normalize: true,
					startCodepoint: 0xE900,
					iconsStyles: false,
					templateOptions: {
						baseClass: '',
						classPrefix: 'icon-'
					},
					embed: false,
					template: 'src/less/fonts/font-build.template'
				}
			},
		},*/
		less: {
			css: {
				options : {
					compress: false,
					ieCompat: false,
					plugins: [
						new NpmImportPlugin({prefix: '~'})
					],
					modifyVars: {
						'hashes': '\'' + uniqid() + '\'',
						'fontpath': '/assets/templates/projectsoft/fonts',
						'imgpath': '/assets/templates/projectsoft/images',
					}
				},
				files : {
					'test/css/main.css' : [
						'src/less/main.less'
					]
				}
			}
		},
		autoprefixer:{
			options: {
				browsers: [
					"last 4 version"
				],
				cascade: true
			},
			css: {
				files: {
					'test/css/prefix.main.css' : [
						'test/css/main.css'
					]
				}
			}
		},
		group_css_media_queries: {
			group: {
				files: {
					'test/css/media/main.css': ['test/css/prefix.main.css']
				}
			}
		},
		replace: {
			css: {
				options: {
					patterns: [
						{
							match: /\/\*.+?\*\//gs,
							replacement: ''
						},
						{
							match: /\r?\n\s+\r?\n/g,
							replacement: '\n'
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/main.css'
						],
						dest: 'test/css/replace/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/main.css'
						],
						dest: 'dist/assets/templates/projectsoft/css/',
						filter: 'isFile'
					}
				]
			},
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			minify: {
				files: {
					'dist/assets/templates/projectsoft/css/main.min.css' : ['test/css/replace/main.css']
				}
			}
		},
		imagemin: {
			options: {
				optimizationLevel: 3,
				svgoPlugins: [
					{
						removeViewBox: false
					}
				]
			},
			base: {
				files: [
					{
						expand: true,
						cwd: 'src/images', 
						src: ['**/*.{png,jpg,jpeg}'],
						dest: 'test/images/',
					},
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/*.{gif,svg}'
						],
						dest: '<%= globalConfig.dist %>/images/',
						filter: 'isFile'
					}
				]
			}
		},
		tinyimg: {
			dynamic: {
				files: [
					{
						expand: true,
						cwd: 'test/images', 
						src: ['**/*.{png,jpg,jpeg}'],
						dest: '<%= globalConfig.dist %>/images/'
					}
				]
			}
		},
		ttf2eot: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: '<%= globalConfig.dist %>/fonts/'
			}
		},
		ttf2woff: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: '<%= globalConfig.dist %>/fonts/'
			}
		},
		ttf2woff2: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: '<%= globalConfig.dist %>/fonts/'
			}
		},
		copy: {
			fonts: {
				expand: true,
				cwd: 'src/fonts',
				src: [
					'**'
				],
				dest: '<%= globalConfig.dist %>/fonts/',
			},
			js: {
				expand: true,
				cwd: 'test/js',
				src: [
					'**'
				],
				dest: '<%= globalConfig.dist %>/js/',
			},
			favicons: {
				expand: true,
				cwd: 'src/favicons',
				src: [
					'**'
				],
				dest: __dirname + "/site/",
			}
		},
		pug: {
			serv: {
				options: {
					client: false,
					pretty: '\t',
					separator:  '\n',
					//pretty: '\t',
					//separator:  '\n',
					data: function(dest, src) {
						return {
							"base": "[(site_url)]",
							"tem_path" : "/assets/templates/projectsoft",
							"img_path" : "assets/templates/projectsoft/images/",
							"site_name": "[(site_name)]",
							"hash": uniqid(),
							"hash_css": uniqid(),
							"hash_js": uniqid(),
							"hash_appjs": uniqid(),
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: __dirname + '/src/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/' + '<%= globalConfig.dist %>/',
						ext: '.html'
					}
				]
			},
			tpl: {
				options: {
					client: false,
					pretty: '\t',
					separator:  '\n',
					data: function(dest, src) {
						return {
							"base": "[(site_url)]",
							"tem_path" : "/assets/templates/projectsoft",
							"img_path" : "assets/templates/projectsoft/images/",
							"site_name": "[(site_name)]",
							"hash": uniqid(),
						}
					},
				},
				files: [
					{
						expand: true,
						dest: __dirname + '/<%= globalConfig.dist %>/tpl/',
						cwd:  __dirname + '/src/pug/tpl/',
						src: '*.pug',
						ext: '.html'
					}
				]
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			less: {
				files: [
					'src/less/**/*.*',
				],
				tasks: gc.less
			},
			js: {
				files: [
					'src/js/**/*.*',
				],
				tasks: gc.js
			},
			pug: {
				files: [
					'src/pug/**/*.*',
				],
				tasks: gc.pug
			},
			images: {
				files: [
					'src/images/**/*.*',
				],
				tasks: gc.images
			},
			fonts : {
				files: [
					'src/fonts/**/*.*',
				],
				tasks: gc.fonts
			},
			//glyph : {
			//	files: [
			//		'src/glyph/**/*.*',
			//	],
			//	tasks: gc.glyph
			//}
		}
	});
	grunt.registerTask('default',	gc.default);
	grunt.registerTask('dev',		["watch"]);
	grunt.registerTask('css',		gc.less);
	grunt.registerTask('images',	gc.images);
	grunt.registerTask('js',		gc.js);
	//grunt.registerTask('glyph',		gc.glyph);
	grunt.registerTask('fonts',		gc.fonts);
	grunt.registerTask('html',		gc.pug);
	grunt.registerTask('speed',		gc.speed);
	grunt.registerTask('work', [
		"clean:all",
		"concat",
		"uglify",
		"imagemin",
		"tinyimg",
		"less",
		"autoprefixer",
		"group_css_media_queries",
		"replace",
		"cssmin",
		"copy",
		"pug"
	]);
};