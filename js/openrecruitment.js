// JavaScript Document

$(function(){
  var division = [
    'Fashahatul Lisan',
    'Matan Jazary',
    'Matan Jurumiyah',
    'Matan Bina wal Af al',
    'Bengkel Murattal',
  ];

  var ikhwan_division = [
    'Fashahatul Lisan',
    'Matan Jazary',
    'Matan Jurumiyah',
    'Matan Bina wal Af al',
    'Bengkel Murattal',
  ];

  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
  });

  var divisionItemTemplate=
    '<div class="col s12 division-item">'
    + '<div class="panel panel-default">'
    + '<div class="panel-heading"><span></span></div></div></div>';

  var divisionItemPlaceholder=
    '<div class="col s12 division-item division-item-placeholder">'
    + '<div class="panel panel-default">'
    + '<div class="panel-heading"><span></span></div></div></div>';

  $('.datepicker').pickadate({
    format:'dd/mm/yyyy',
    today: '',
    close: 'Set',
    selectYears:60,
    selectMonths:true
  });

  var isShuffled=false;

  function initializePool() {
        var pool = $('.division-pool');
        pool.empty();
        for (i = 0; i < division.length; ++i) {
            var newDivisionItem = $($.parseHTML(divisionItemTemplate));
            newDivisionItem.data('division', division[i]);
            pool.append(newDivisionItem);
        }
        pool.append('<div class="clear"></div>');
    }
  
  function initializePoolIkhwan() {
        var pool = $('.division-pool');
        pool.empty();
        for (i = 0; i < ikhwan_division.length; ++i) {
            var newDivisionItem = $($.parseHTML(divisionItemTemplate));
            newDivisionItem.data('division', ikhwan_division[i]);
            pool.append(newDivisionItem);
        }
        pool.append('<div class="clear"></div>');
    }

  $('.modal').modal({
    dismissible:false,
  });

  initializePool();

  /* Credit to Joshua Atmadja */
   function shuffle(){
        for(i = 1;i <= 100; ++i){
            var x = Math.floor(Math.random() * i) % division.length;
            var y = Math.floor(Math.random() * (i + 1)) % division.length;
            var temp = division[x];
            division[x] = division[y];
            division[y] = temp;
        }
        initializePool();
        reorderDivisionItem();
        isShuffled = true;
    }


   function shuffleIkhwan(){
        for(i = 1;i <= 100; ++i){
            var x = Math.floor(Math.random() * i) % ikhwan_division.length;
            var y = Math.floor(Math.random() * (i + 1)) % ikhwan_division.length;
            var temp = ikhwan_division[x];
            ikhwan_division[x] = ikhwan_division[y];
            ikhwan_division[y] = temp;
        }
        initializePoolIkhwan();
        reorderDivisionItem();
        isShuffled = true;
    }
    // initially, shuffle the options
    shuffle();

 function reorderDivisionItem(ui) {
        // reorder the numbering
        $('.division-item:not(.ui-sortable-helper)').each(function(i, e) {
            // convert into jQuery object
            e = $(e);
            if (e.hasClass('division-item-placeholder')) {
                e = ui.helper;
            }
            var name = e.data('division');
            e.find('span').html('' + (i + 1) + '. ' + name);

            // bold the top three, replace them in text
            e.removeClass('division-item-top');
            if (i < 3) {
                e.addClass('division-item-top');
                $('.division-' + (i + 1)).html(name);
            }
        });
    }
    reorderDivisionItem();

    $('.division-pool').sortable({
        cursor: 'move',
        items: '.division-item',
        opacity: 0.8,
        update: function (event, ui) {
            reorderDivisionItem();
            isShuffled = false;
        },
        sort: function (event, ui) {
            reorderDivisionItem(ui);
        },
        placeholder: {
            element: function(clone, ui) {
                return $(divisionItemPlaceholder);
            },
            update: function() {}
        },
        revert: 300
    });

    $('#mentoring').on("change", function(){
      if ($(this).val() == 'Tidak'){
        $('[id=motivational]').show();
      } else {
        $('[id=motivational]').hide();
      }
    });

    $('#jenis-kelamin').on("change", function(){
      if ($(this).val() == 'Ikhwan'){
        initializePoolIkhwan();
        shuffleIkhwan();
        $('#annisa').hide();
      } else {
        initializePool();
        shuffle();
        $('#annisa').show();
      }
    });

  $('#lmd').on("change", function(){
      if ($(this).val() == 'Ya'){
        $('[id=angkatan-lmd-holder]').show();
      } else {
        $('[id=angkatan-lmd-holder]').hide();
      }
    });

  function validate(){
    var valid = true;
    var parent = $('#belum-diisi');
    parent.html('<ol></ol>');
if ($('#kelamin').val() == ""){
      parent.find('ol').append('<li>Kelamin Anda</li>');
      valid = false;
    }
	if ($('#name').val() == ""){
      parent.find('ol').append('<li>Nama lengkap Anda</li>');
      valid = false;
    }
    if ($('#tempatLahir').val() == "" || $('#tanggalLahir').val() == ""){
      parent.find('ol').append('<li>Tempat tanggal lahir Anda</li>');
      valid = false;
    }
    if ($('#nomorTelepon').val() == "" || ($('#nomorTelepon').val())[0] != "'"){
      parent.find('ol').append('<li>Nomor telepon Anda (pastikan menggunakan tanda petik satu. Misal '08123456789)</li>');
      valid = false;
    }
    if ($('#email').val() == ""){
      parent.find('ol').append('<li>Alamat email Anda</li>');
      valid = false;
    }
	if ($('#alamat').val() == ""){
      parent.find('ol').append('<li>Alamat tinggal Anda di Bandung</li>');
      valid = false;
    }
    if ($('#idLine').val() == ""){
      parent.find('ol').append('<li>ID Line Anda</li>');
      valid = false;
    }
									
															  
					
	 
	if (($('#noDarurat').val() == "") || ($('#pihakDarurat').val() == "") || ($('#noDarurat').val())[0] != "'"){
      parent.find('ol').append('<li>Kontak darurat Anda (pastikan menggunakan tanda petik satu. Misal '08123456789)</li>');
      valid = false;
    }
    if ($('#PerguruanTinggi').val() == ""){
      parent.find('ol').append('<li>Perguruan Tinggi Anda/li>');
      valid = false;
    }
	if ($('#jurusan').val() == ""){
      parent.find('ol').append('<li>Jurusan Anda/li>');
      valid = false;
    }
    if ($('#angkatan').val() == ""){
      parent.find('ol').append('<li>Angkatan/li>');
      valid = false;
    }
    if ($('#nim').val() == ""){
      parent.find('ol').append('<li>NIM Anda</li>');
      valid = false;
    }
	if ($('#ssc').val() == ""){
      parent.find('ol').append('<li>SSC</li>');
      valid = false;
    }
	if ($('#lmd').val() == ""){
      parent.find('ol').append('<li>LMD</li>');
      valid = false;
    }
	var reasonfilled=true;
    for (var i = 1; i <= 3; ++i) {
            if($('#reason' + i).val()==""){
              valid=false;
              reasonfilled=false;
            };
    }
    if(!reasonfilled) parent.find('ol').append('<li>Alasan minat jenis pembinaan pilihan Anda</li>');

    if(!$('#agree').is(':checked')){
      parent.append('<span>...Silahkan setujui pernyataan akhirnya</span>');
      valid = false;
    }
    return valid;
  }
  
  $('.submit-button').click(function(){
    if(validate()){
      fillModal();
      $('#review-modal').modal('open');
    }
    else
      $('#error-modal').modal('open');
  });
  
  $('#reset-button').click(function(){
    $('#review-modal').modal('close');
  });
  
   $('#reset-button-2').click(function(){
    $('#error-modal').modal('close');
  });

  function fillModal(){
    $('#kelamin-review').html($('#kelamin').val());
	$('#nama-review').html($('#name').val());
    $('#ttl-review').html($('#tempatLahir').val()+", "+$('#tanggalLahir').val());
    $('#nomorTelepon-review').html($('#nomorTelepon').val());
    $('#email-review').html($("#email").val());
    $('#alamat-review').html($("#alamat").val());
    $('#line-review').html($('#idLine').val());
    $('#emergency-review').html($('#noDarurat').val()+" ("+$('#pihakDarurat').val()+")");
    $('#PerguruanTinggi-review').html($("#PerguruanTinggi").val());
    $('#jurusan-review').html($("#jurusan").val());
    $('#angkatan-review').html($("#angkatan").val());
    $('#tentang-review').html($("#tentang").val());
    $('#motivasi-review').html($("#motivasi").val());
	$('#nim-review').html($('#nim').val());
													   
	$('#ssc-review').html($('#ssc').val());
																			   
												 
    $('#lmd-review').html($('#lmd').val());
	var order = $('#division-review');
        order.html('<ol></ol>');
        $('.division-item').each(function(i, e) {
            order.find('ol').append('<li>' + $(e).data('division') + '</li>');
        });
    
    for (var i = 1; i <= 3; ++i) {
            $('#reason' + i + '-review').html('<em>'+$('#reason' + i).val()+'</em>');
        }
	
  }

  var formKey = "e/1FAIpQLScccYkYNdu1pwBydwvyCfk7V-GoXNwJi7rJeb4rVXP1BSUeNA/";
  
  var formEntries = {
    kelamin: "entry.1174628476", //done
    nama: "entry.1595111010", //done
										   
    tempatlahir: "entry.634597664", //done
    tanggallahir: "entry.2111663466", //done
    notelp: "entry.322697157", //done
    notelpdarurat: "entry.1963710424", //done
    pemilikdarurat: "entry.1667314479", //done
    email: "entry.955620879", //done
										
    alamat: "entry.564366021", //done
    idline: "entry.1370761424", //done
    PerguruanTinggi: "entry.131937076", //done
    jurusan: "entry.1833029968", //done
	angkatan: "entry.1407034567", //done
	nim: "entry.1089301769", //done
    ssc: "entry.1167102149", //done
	lmd: "entry.479064761", //done
    tentang: "entry.233112318", //done
    motivasi: "entry.326195378", //done
	
	divisi:[
    "entry.1107117913",    //Pilihan 1
    "entry.806092561",     //Pilihan 2
    "entry.1077812872",    //Pilihan 3
    "entry.2104639195",    //Pilihan 4
    "entry.1149965754",    //Pilihan 5
    ],
    
    alasan:[
    "entry.1609272473",    //Alasan 1
    "entry.449049098",   //Alasan 2
    "entry.408751174"    //Alasan 3
    ],
  };

  $('#real-submit-button').click(function(){
    var url = "https://docs.google.com/forms/d/e/1FAIpQLScccYkYNdu1pwBydwvyCfk7V-GoXNwJi7rJeb4rVXP1BSUeNA/formResponse";
	
    
    var form = $('#main-form');
    form.attr('action', url);
    form.html('');
    var tmp;
    
    form.append('<input type="text" name="' + formEntries.kelamin + '" value="' + $('#kelamin').val() + '">');
      form.append('<input type="text" name="' + formEntries.nama + '" value="' + $('#name').val() + '">');
																														   
      form.append('<input type="text" name="' + formEntries.tempatlahir + '" value="' + $('#tempatLahir').val() + '">');
      form.append('<input type="text" name="' + formEntries.tanggallahir + '" value="' + $('#tanggalLahir').val() + '">');
      form.append('<input type="text" name="' + formEntries.notelp + '" value="' + $('#nomorTelepon').val() + '">');
      form.append('<input type="text" name="' + formEntries.notelpdarurat + '" value="' + $('#noDarurat').val() + '">');
      form.append('<input type="text" name="' + formEntries.pemilikdarurat + '" value="' + $('#pihakDarurat').val() + '">');
      form.append('<input type="text" name="' + formEntries.email + '" value="' + $('#email').val() + '">');
      form.append('<input type="text" name="' + formEntries.alamat + '" value="' + $('#alamat').val() + '">');
																													   
      form.append('<input type="text" name="' + formEntries.idline + '" value="' + $('#idLine').val() + '">');
      form.append('<input type="text" name="' + formEntries.PerguruanTinggi + '" value="' + $('#PerguruanTinggi').val() + '">');
      form.append('<input type="text" name="' + formEntries.jurusan + '" value="' + $('#jurusan').val() + '">');
	  form.append('<input type="text" name="' + formEntries.angkatan + '" value="' + $('#angkatan').val() + '">');
	  form.append('<input type="text" name="' + formEntries.nim + '" value="' + $('#nim').val() + '">');
	  form.append('<input type="text" name="' + formEntries.ssc + '" value="' + $('#ssc').val() + '">');
      form.append('<input type="text" name="' + formEntries.lmd + '" value="' + $('#lmd').val() + '">');
	  form.append('<input type="text" name="' + formEntries.tentang + '" value="' + $('#tentang').val() + '">');																									  
	  form.append('<input type="text" name="' + formEntries.motivasi + '" value="' + $('#motivasi').val() + '">');																																																									
      $('.division-item').each(function(i, e) {
            if(i<9) form.append('<input type="text" name="' + formEntries.divisi[i] + '" value="' + $(e).data('division') + '">');
      });
      for (i = 1; i <= 3; ++i) {
            form.append('<input type="text" name="' + formEntries.alasan[i-1] + '" value="' + $('#reason' + i).val() + '">');
      }				
      form.submit();    
      console.log("5");
  });
  
  particlesJS("particles-js",{
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#1e00ff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 125,
        "color": "#004dbb",
        "opacity": 0.5,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "top-right",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 180,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
});
