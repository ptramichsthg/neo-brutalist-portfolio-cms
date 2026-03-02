export const PHONE = '6282285598500'


export function getGenericChatLink() {
    const message = `Halo, Saya ingin konsultasi.`
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export function getServiceChatLink(serviceName: string) {
    const message = `Halo Saya tertarik dengan layanan *${serviceName}*. Boleh minta detail harga dan prosesnya?`;
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}