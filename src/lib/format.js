export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
}

export function formatDate(date) {
    return new Intl.DateTimeFormat('en-NG', {
        dateStyle: 'full',
        timeStyle: 'short'
    }).format(new Date(date))
}

export function formatNumber(num) {
    return new Intl.NumberFormat('en-NG').format(num)
}
