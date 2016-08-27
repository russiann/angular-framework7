(function(){
  var device = Dom7('html').attr('platform');

  if (device === 'android') return setAndroidTheme();
  if (device === 'ios') return setIosTheme();

  Framework7.prototype.device.android ? setAndroidTheme() : setIosTheme();

  function setIosTheme() {
    window.selectedPlatform = 'ios';
    Dom7('.view').append('<div class="navbar"></div>')
    Dom7('head').append(
      '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.ios.min.css">' +
      '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.ios.colors.min.css">'
    );
    Dom7('html').addClass('platform-ios');
  }

  function setAndroidTheme () {
    window.selectedPlatform = 'android';
    Dom7('head').append(
      '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.material.min.css">' +
      '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.material.colors.min.css">'
    );
    Dom7('html').addClass('platform-android');
  }

})()
