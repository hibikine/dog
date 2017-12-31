const versions = {
};

export default function showVersion() {
  $('#title-version').text(Object.keys(versions)[0]);

  Object.entries(versions).reduce(($version, [key, value]) => {
    $version.append($(`<dt>${key}:</dt>`));
    $version.append($(`<dd>${value}</dd>`));
    return $version;
  }, $('#version-log'));
}