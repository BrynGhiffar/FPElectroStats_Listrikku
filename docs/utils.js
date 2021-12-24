function* range(start, end) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}

function randint(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

function* randarray_(start, length) {
    let current = start;
    let add;
    for (let i = 0; i < length; i++) {
        yield current;
        add = (Math.random() - 1 / 2) * 20;
        current += add * Math.pow(-1, ((current + add) <= 0));
    }
}

function isLeapYear(year) {
    if (year % 400 == 0) {
        return true;
    }

    if (year % 100 == 0) {
        return false;
    }

    if (year % 4 == 0) {
        return true;
    }

    return false;
}

function getDays(month, year) {
    // returns the number of days in a particular month of a particular year
    let months = {
        'January' : 31,
        'February' : 28,
        'March' : 31,
        'April': 30,
        'May' : 31,
        'June': 30,
        'July' : 31,
        'August' : 31,
        'September': 30,
        'October' : 31,
        'November': 30,
        'December': 31,
    };
    if (month in months) {
        if (month == 'February') {
            return months[month] + isLeapYear(year);
        }
        return months[month];
    }
}

export {range, randint, randarray_, getDays};