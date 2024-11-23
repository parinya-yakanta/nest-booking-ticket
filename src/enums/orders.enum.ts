export enum OrderStatus {
    PENDING = 'pending',
    PAID = 'paid',
    CONFIRM = 'confirm',
    PAYMENT_FAILED = 'payment_failed',
    SHIPPING = 'shipping',
    RECEIVED = 'received',
    CANCELLED = 'cancelled',
}

export enum OrderCurrency {
    THB = 'THB',
    USD = 'USD',
    EUR = 'EUR',
    JPY = 'JPY',
    CNY = 'CNY',
}