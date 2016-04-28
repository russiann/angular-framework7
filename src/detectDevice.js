if (Framework7.prototype.device.android) {
  Dom7('head').append(
    '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.material.min.css">' +
    '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.material.colors.min.css">'
  );
}
else {
  Dom7('.view').append('<div class="navbar"></div>')
  Dom7('head').append(
    '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.ios.min.css">' +
    '<link rel="stylesheet" href="bower_components/Framework7/dist/css/framework7.ios.colors.min.css">'
  );
}
