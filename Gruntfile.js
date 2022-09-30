//** grunt will be used as the main task runner for this application */

'use strict';

module.exports = function(grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Automatically load required Grunt task
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    }); //** main grunt configuration of tasks */
    grunt.initConfig({
        //** configuring sass task */
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.css'
                }
            }
        },
        //** configuring watch task */
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        //**configuring browserSync task */
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        open: 'chrome',
                        baseDir: './',
                        port: grunt.option('port') || 3000
                    }
                }
            }
        },
        //** configuring copy task */
        // copy: {
        //     html: {
        //         files: [{
        //             expand: true,
        //             dot: true,
        //             cwd: './',
        //             src: ['*.html'],
        //             dest: 'dist'
        //         }]
        //     },
        //     fonts: {
        //         files: [{
        //             expand: true,
        //             dot: true,
        //             cwd: 'node_modules/font-awesome',
        //             src: ['fonts/*.*'],
        //             dest: 'dist'
        //         }]
        //     }
        // },
        //** configuring clean task */
        clean: {
            build: {
                src: ['dist/']
            }
        },
        //** configuring imagemin task */
        // imagemin: {
        //     dynamic: {
        //         files: [{
        //             expand: true,
        //             dont: true,
        //             cwd: './',
        //             src: ['img/*.{png,jpg,gif}'],
        //             dest: 'dist'
        //         }]
        //     }
        // },
        //** configuring useminPrepare task */
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: [
                    'contact.html', 
                    'about.html', 
                    'index.html',
                    'products.html',
                    'specials.html',
                    'gifts.html',
                    'termsAndConditions.html',
                    'privacyPolicy.html'
                ]
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context ,block) {
                                const generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        //** configuring concat task */
        concat: {
            options: {
                seperator: ';'
            },
            dist: {},

        },
        //** configuring uglify task */
        uglify: {
            dist: {}
        },
        //** configuring cssmin task */
        cssmin: {
            dist: {}
        },
        //** configuring filrev task */
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },
        //** configuring usemin task */
        usemin: {
            html: [
                'dist/contact.html',
                'dist/about.html',
                'dist/index.html',
                'dist/products.html',
                'dist/specials.html',
                'dist/gifts.html',
                'dist/termsAndConditions.html',
                'dist/privacyPolicy.html'
            ],
            options: {
                assetsDirs: ['dist', 'dist/css', 'dist/js']
            }
        },
        //** configuring htmlmin task */
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html' : 'dist/index.html',
                    'dist/contact.html' : 'dist/contact.html',
                    'dist/about.html' : 'dist/about.html',
                    'dist/products.html' : 'dist/products.html',
                    'dist/specials.html' : 'dist/specials.html',
                    'dist/gifts.html' : 'dist/gifts.html',
                    'dist/termsAndConditions.html' : 'dist/termsAndConditions.html',
                    'dist/privacyPolicy.html' : 'dist/privacyPolicy.html'
                }
            }
        }

    });
    //** execution of grunt tasks */
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};