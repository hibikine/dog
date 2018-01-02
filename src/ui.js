import changeName from './names';

export function updateMeter(count) {
  const meter = 1 + count / 2;
  $('#meter').html(`${meter}m`);
  changeName(meter);
}

export function updateResetButton(count) {
  $('#reset').prop('disabled', count === 0);
}
