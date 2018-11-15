import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.locale(en);

export function host(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = host.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

export function timeAgo(timestamp) {
  const timeAgo = new TimeAgo('en-US');
  const formedString = timeAgo.format(timestamp);
  return formedString;
}

export function booleanToBinary(bool) {
  if (bool) {
    return 'Yes';
  }
  return 'No';
}

export function formattedDate(timestamp) {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleString('en-US', options);
}

export function usd(amount) {
  if (!isNaN(amount)) {
    const newValue = amount.toLocaleString('en-US');
    return `$${newValue}`;
  }
}

export function people(number) {
  if (!isNaN(number)) {
    if (number === 1) {
      return `${number} person`;
    }
    return `${number} people`;
  }
}

// This filter was added for the GiveItUp version
export function currencyFormat(value) {
  if (typeof value !== 'number') return value;

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

  return formatter.format(value);
}
