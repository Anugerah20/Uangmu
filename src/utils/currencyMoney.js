// Fungsi untuk mengubah angka menjadi format mata uang rupiah
export const formatToIDR = (amount) => {
     // Cek apakah amount itu merupakan angka
     if (!(typeof amount === 'number')) {
          console.log('Invalid, please input number')
     }

     const currencyMoney = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
     }).format(amount);

     return currencyMoney;
}