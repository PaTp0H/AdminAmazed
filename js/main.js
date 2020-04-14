function infoBlockCounter(block) {

    $(block).find('.count').each(function () {
        $(this).addClass('active-count');
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now).toLocaleString('ja-JP'));
            }
        });
    })
}

function analyticDiagram() {
    var analyticDiagramChart = document.getElementById("analytic-char").getContext('2d');
    var reportHeight = document.querySelector(".analytic__char-box").offsetHeight;
    var gradientStroke = analyticDiagramChart.createLinearGradient(0, 0, 0, reportHeight);

    gradientStroke.addColorStop(0, "rgba(255, 255, 255, 0.743286)");
    gradientStroke.addColorStop(1, "rgba(81, 188, 251, 0.743286) ");

    function generateData(type) {
        let data = [];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        
        if (type == 'month') {
            for (let i = 0; i < 32; i++) {                
                data[i] = getRandomInt(1000000);
            }
        } else if (type == 'this_quarter') {
            for (let i = 0; i < 6; i++) {
                data[i] = getRandomInt(100000);
            }
        } else if (type == 'last_quarter') {
            for (let i = 0; i < 6; i++) {
                data[i] = getRandomInt(100000);
            }
        } else if (type == 'views') {
            for (let i = 0; i < 6; i++) {
                data[i] = getRandomInt(100000);
            }
        }
        
        return data;
    }

    function generatelabels(type) {
        let labels = [];

        if (type == 'month') {
            labels = ["Aug 1", "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7", "Aug 8", "Aug 9", "Aug 10", "Aug 11", "Aug 12", 'Aug 13', 'Aug 14', 'Aug 15', "Aug 16", "Aug 18", "Aug 19", "Aug 20", "Aug 21", "Aug 22", 'Aug 23', 'Aug 24', 'Aug 25', "Aug 26", "Aug 27", "Aug 28", 'Aug 29', 'Aug 30', 'Aug 31'];
        } else if (type == 'this_quarter') {
            labels = ["Dec 17", "Jan 18", "Feb 19", "March 20", "Apr 21", "June 22"];
        } else if (type == 'last_quarter') {
            labels = ["July 17", "Aug 18", "Sep 19", "Oct 20", "Apr 21", "Nov 22"];
        } else if (type == 'views') {
            labels = ["Now 17", "Now 18", "Now 19", "Now 20", "Now 21", "Now 22"];
        }

        return labels;
    }

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    config = {
        type: 'line',
        data: {
            labels: generatelabels('month'),
            datasets: [{
                label: '',
                data: generateData('month'),
                backgroundColor: gradientStroke,
                borderColor: gradientStroke,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 5,
                pointBackgroundColor: '#ffffff',
                pointHoverBackgroundColor: '#edf0f5',
                pointHoverBorderColor: '#0c689e',
                pointHoverBorderWidth: 5,
                pointHoverRadius: 7,
                borderWidth: 0,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                mode: 'index',
                axis: 'y',
                position: 'nearest',
                backgroundColor: '#ffffff',
                titleFontColor: '#9058ee',
                bodyFontColor: '#12a4f9',
                titleFontSize: 16,
                bodyFontSize: 16,
                xPadding: 15,
                yPadding: 15,
                titleMarginBottom: 10,
                bodyAlign: 'center',
                displayColors: false,
                borderColor: '#0c689e',
                borderWidth: 2,
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        

                        if (label) {
                            label += ': ';
                        }
                        
                        label += tooltipItem.yLabel.toLocaleString('ja-JP');

                        return label;
                    }
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        tickMarkLength: 1,
                        borderDash: [5, 15],
                        color: 'rgba(255,255,255, 0.5)'
                    },
                    offset: false,
                    ticks: {
                        padding: 20,
                        fontSize: 18,
                        fontColor: '#ffffff',
                        fontFamily: 'Ubuntu',
                    },
                }],
                yAxes: [{
                    gridLines: {
                        tickMarkLength: 1,
                        borderDash: [5, 15],
                        color: 'rgba(255,255,255, 0.5)'
                    },
                    scaleLabel: {
                        display: false,
                        padding: {
                            top: 1,
                            bottom: 1
                        },
                        labelString: 'value'
                    },
                    ticks: {
                        fontColor: '#ffffff',
                        fontSize: 18,
                        fontFamily: 'Ubuntu',
                        padding: 20,
                        callback: function (value, index, values) {                            
                            return kFormatter(value);
                        }
                    }
                }],

            },
        }
    }

    var analytic = new Chart(analyticDiagramChart, config);

    $('.content-btn').on('click', function () {
        if(!$(this).hasClass('active')) {
            $('.content-btn').removeClass('active');
            $(this).addClass('active');
    
            var type = $(this).attr('data-type')
            var dataset = analytic.config.data.datasets[0];
            dataset.data = generateData(type);
            analytic.config.data.labels = generatelabels(type);
            analytic.update();
        }

    });
}

if ($('.analytic').length) {
    analyticDiagram();
}

function videosDiagrams() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generateVideoData() {
        data = [];
        for (let i = 0; i < 7; i++) {                
            data[i] = getRandomInt(100);
        }
        return data;
    }

    function generateVideoLabels() {
        labels = ['1:20','7:54', '43:12', '3:23', '21:22','4:10'];
        
        return labels;
    }

    var videoPreviewItem = document.querySelectorAll(".audience__diagram");

    function generateConfig() {

        configPreview = {
            type: 'line',
            data: {
                labels: generateVideoLabels(),
                datasets: [{
                    label: '',
                    data: generateVideoData(),
                    backgroundColor: 'transparent',
                    borderColor: '#fd4000',
                    pointBorderColor: '#fd4000',
                    pointBorderWidth: 1,
                    pointHitRadius: 1,
                    pointBackgroundColor: '#fd4000',
                    pointHoverBackgroundColor: '#fd4000',
                    pointBorderColor: '#ffffff',
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        display:false,
                        gridLines: {
                            display: false,
                        },
                        offset: false,
                        ticks: {
                            display:false
                        },
                    }],
                    yAxes: [{
                        display:false,
                        gridLines: {
                            display:false
                        },
                        scaleLabel: {
                            display: false,
                        },
                        ticks: {
                            display:false
                        }
                    }],
    
                },
            }
        }

        return configPreview;
    }

    function createBigSchedule(data) {
        let {labels, datasets} = data;
        var videosSchedule = $('.videos__schedule');
        var scheduleSelector = document.querySelector(".schedule").getContext('2d');

        var numberLabels = labels.map(function (item) {
            return parseFloat(item.replace(/:/, '.'));
        })

        var maxLaben = Math.max(...numberLabels);

        videosSchedule.find('.videos__schedule-percent').text(Math.max(...datasets[0].data) + '%');
        videosSchedule.find('.videos__schedule-time').text(maxLaben.toString().replace(/\./, ':'));

        config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: datasets[0].data,
                    backgroundColor: '#fafeff',
                    borderColor: '#12a4f9',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 4,
                    pointBackgroundColor: '#12a4f9',
                    pointHoverBackgroundColor: '#edf0f5',
                    pointHoverBorderColor: '#0c689e',
                    pointHoverBorderWidth: 5,
                    pointRadius: 8,
                    pointHoverRadius: 7,
                    borderWidth: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    mode: 'index',
                    axis: 'y',
                    position: 'nearest',
                    backgroundColor: '#ffffff',
                    titleFontColor: '#070707',
                    bodyFontColor: '#0c689e',
                    bodyFontFamily: 'Ubuntu',
                    titleFontFamily: 'Ubuntu',
                    bodyFontWeight: '500',
                    titleFontSize: 18,
                    bodyFontSize: 28,
                    xPadding: 32,
                    yPadding: 20,
                    titleMarginBottom: 10,
                    bodyAlign: 'center',
                    displayColors: false,
                    borderColor: '#0c689e',
                    borderWidth: 2,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
    
                            if (label) {
                                label += ': ';
                            }
                            
                            label += tooltipItem.yLabel + "%";
    
                            return label;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        offset: false,
                        ticks: {
                            padding: 20,
                            fontSize: 18,
                            fontColor: '#070707',
                            fontFamily: 'Ubuntu',
                        },
                    }],
                    yAxes: [{
                        position: 'right',
                        
                        gridLines: {
                            drawBorder: false,
                            display: false
                        },
                        scaleLabel: {
                            display: false,
                        },
                        
                        ticks: {
                            stepSize: 20,
                            max: 100,
                            fontColor: '#070707',
                            fontSize: 18,
                            fontFamily: 'Ubuntu',
                            padding: 20,
                            callback: function (value, index, values) {                            
                                return value + '%';
                            }
                        }
                    }],
    
                },
            }
        }

        let schedule = new Chart(scheduleSelector, config);
        videosSchedule.addClass('active');

        $('.videos__schedule-close').on('click', function () {
            $(this).closest('.videos__schedule').removeClass('active');
            schedule.destroy()
        })
    }

    let videoItems = [];

    videoPreviewItem.forEach(function(item, index) {
        videoItems[index] = new Chart(item.getContext('2d'), generateConfig());
    })

    $(videoPreviewItem).on('click', function () {
        const index = $(this).attr('data-audience');     
        createBigSchedule(videoItems[index].data)
    })
}

if ($('.videos').length) {
    videosDiagrams();
}

$(document).ready(function () {
    $('.menu').on('click', '.menu__btn', function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $('body').removeClass('overflow');
        } else {
            $(this).parent().addClass('active');
            $('body').addClass('overflow');
        }
    })

    $('.brands__item').each(function (i) {
        var arrow = '<svg version="1.1" id="Capa_1" x="0px" y="0px"width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929;" xml:space="preserve"><path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441 L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082 c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647 c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/></svg>';
        $(this).find('.brands__slider').slick({
            arrows: true,
            dots: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            appendArrows: $(this).find('.brands__arrows'),
            prevArrow: `<span class="brands__arrow brands__arrow-prev">${arrow}</span>`,
            nextArrow: `<span class="brands__arrow brands__arrow-next">${arrow}</span>`
        })
    })

    var controller = new ScrollMagic.Controller();
    var blocks = document.querySelectorAll('.info-block');
    blocks.forEach(function (block) {
        var scene = new ScrollMagic.Scene({
                triggerElement: block,
                triggerHook: 0.9,
                duration: "80%",
                offset: 300
            })
            .on("enter", function () {
                infoBlockCounter(block)
            })
            .on("leave", function () {
                scene.destroy();
            })
            .addTo(controller);
    })

    if($('.analytic__static').length) {
        var staticBlock = document.querySelector('.analytic__static');
        var scene = new ScrollMagic.Scene({
            triggerElement: staticBlock,
            triggerHook: 0.9,
            duration: "80%",
            offset: 100
        })
        .on("enter", function () {
            infoBlockCounter(staticBlock)
        })
        .on("leave", function () {
            scene.destroy();
        })
        .addTo(controller);
    }
    if($('.login-form').length) {
        
    var loginForm = document.querySelector('.login-form');
    var scene1 = new ScrollMagic.Scene({
        triggerElement: loginForm,
        triggerHook: 0.9,
        duration: "80%",
        offset: 100
    })
    .on("enter", function () {
        loginForm.classList.add('animated');
    })
    .on("leave", function () {
        scene1.destroy();
    })
    .addTo(controller);
    }

    // Login form forgot pass
    $('.login-form__form-forgot').on('click', function (e) {
        e.preventDefault();
        if(!$(this).hasClass('hide-submit-form')) {
            $('.login-form__form-submit-form').hide();
            $('.login-form__form-forgot-form').show().css('display', 'flex');
            $(this).text('Sign in').addClass('hide-submit-form');
            $('.login-form__form-submit').text('Remember password');
        }
        else {
            $('.login-form__form-submit-form').show().css('display', 'flex');
            $('.login-form__form-forgot-form').hide();
            $(this).text('Forgot Password?').removeClass('hide-submit-form');
            $('.login-form__form-submit').text('Sing in');
        }
    })

    $('.trigger-form').on('click', function () {
        if(!$(this).parent().hasClass('active')) {
            $('.trigger-form').parent().removeClass('active');
            $(this).parent().addClass('active');
        }
        else {
            $(this).parent().removeClass('active');
        }
    })

    $('.videos__add-new-close').on('click', function () {
        $(this).closest('.videos__add-new-box').removeClass('active');
    })
    $('.admin__add-new-close').on('click', function () {
        $(this).closest('.admin__add-new-box').removeClass('active');
    })

    $('.compare').on('click', function () {
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.compare__checked').prop('checked', false);
            $('.videos__table tr').addClass('off-color');
        }
        else {
            $(this).removeClass('active');
            $('.compare__checked').prop('checked', true);
            $('.videos__table tr').removeClass('off-color');
        }
    })
    $('.compare__checked').on('change', function () {
        $(this).closest('tr').toggleClass('off-color');
    })

    function generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    $('.generate-pass').on('click', function () {
        $('.admin__add-new-input-pass').val(generatePassword)
    });
    $('.admin__add-new-title').on('click', function () {
        $(this).closest('.admin__add-new-box').removeClass('active');
    })
});