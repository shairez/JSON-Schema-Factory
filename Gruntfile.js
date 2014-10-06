
module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	var onlyMocks = '<%= yeoman.app %>/**/*.mock.js',
		onlySources = ['<%= yeoman.app %>/**/*.mdl.js',
						'<%= yeoman.app %>/**/*.js',
						'!' + onlyMocks,
						'!<%= yeoman.app %>/**/*.test.js'];

	grunt.initConfig({
		yeoman: {
			app: 'src',
			dist: 'dist',
			distFileName: 'json-schema-factory'
		},

		clean: {
			js: ["<%= yeoman.dist %>/*.js",
				"!<%= yeoman.dist %>/*.min.js"],
			all: ["<%= yeoman.dist %>"]
		},
		watch: {
			js: {
				files: onlySources,
				tasks: ['concat:js']
			},
			mocks: {
				files: ['<%= yeoman.app %>/**/*.mock.js'],
				tasks: ['concat:mocks']
			}
		},
        jshint: {
            options:{
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/{,*/}*.js'
                ]
            }

        },
		concat: {
			js: {
				files:{
					"<%= yeoman.dist %>/<%= yeoman.distFileName %>.js": onlySources
				}
			},
			mocks: {
				files:{
					"<%= yeoman.dist %>/<%= yeoman.distFileName %>-mocks.js": onlyMocks
				}
			}
		},

		uglify: {
			dist: {
				files: {
					'<%= yeoman.dist %>/<%= yeoman.distFileName %>.min.js': [
						'<%= yeoman.dist %>/<%= yeoman.distFileName %>.js'
					]
				}
			}
		}



	});

	// Run this during development
	grunt.registerTask('dev', [
		'clean:js',
		'concat',
		'watch'
	])

	grunt.registerTask('build', [
		'clean:all',
        'jshint',
		'concat',
		'uglify'
	]);


	grunt.registerTask('default', ['build']);
};
