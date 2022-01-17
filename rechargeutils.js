let counters = {
}

function onClick(e) {
    let target = e.target;
    let val = parseInt(target.classList[1].slice(1));
    let targetClass = target.classList[0];
    let paymentBtns = document.getElementsByClassName(targetClass);

    if (targetClass in counters) {
        // revert back to default styling
        paymentBtns[counters[targetClass]].classList.remove("active");
        paymentBtns[counters[targetClass]].classList.add("inactive");
    }
    
    // change to new styling
    paymentBtns[val].classList.remove("inactive");
    paymentBtns[val].classList.add("active");
    counters[targetClass] = val;
    
}

function onConfirm(e) {
    if ((counters["payment"] >= 0) && (counters["method"] >= 0)) {
        alert("Payment Success");
        location.reload();
    } else {
        alert("Please select recharge amount and payment method");
    }
}