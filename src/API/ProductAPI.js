import PouchDB from 'pouchdb'

// Khai báo cơ sở dữ liệu cục bộ

const webApp = new PouchDB('product')

// Khai báo csdl từ xa

const remoteWebApp =  new PouchDB('http://admin:admin@192.168.1.100:30984/product')

// Đồng bộ hóa cơ sở dữ liệu cục bộ và từ xa
PouchDB.sync(webApp, remoteWebApp, {
    live: true,
    timeout: false, //Vô hiệu hóa thời gian chờ
    retry: true,    //Thử đồng bộ lại nếu thất bại
})

// Thêm mới

export const addProduct = (data) => webApp.post(data);

export const editProduct = data => webApp.put(data)
// Xoa bia
export const removeProduct = data => webApp.get(data).then(doc => webApp.remove(doc._id, doc._rev))
//Liệt kê tất cả
export const getProduct = () =>
   webApp
        .allDocs({
            include_docs: true,
            descending: true,
        })
        .then(doc => doc.rows.map(row => row.doc))
//Lắng nghe các thay đổi
export const ondataChange = callback =>
        webApp.changes({ since: "now", live: true}).on("change", callback)