import PouchDB from 'pouchdb'

//Khai báo cơ sở dữ liệu cục bộ
const beersDatabase = new PouchDB("unit-product")
//Khai báo cơ sở dữ liệu từ xa
const remoteBeersDatabase = new PouchDB('http://admin:admin@192.168.1.100:30984/unit-product')
// Đồng bộ hóa cơ sở dữ liệu cục bộ và từ xa
PouchDB.sync(beersDatabase, remoteBeersDatabase, {
    live: true,
    timeout: false, //Vô hiệu hóa thời gian chờ
    retry: true,    //Thử đồng bộ lại nếu thất bại
})
//Nếu cơ sở dữ liệu bia chưa tồn tại => được tạo tự động khi một đối tượng được thêm mới
export const adddata = data => beersDatabase.post(data)
//Cap nhat bia
export const editdata = data => beersDatabase.put(data)
// Xoa bia
export const removedata = data => beersDatabase.get(data).then(doc => beersDatabase.remove(doc._id, doc._rev))
//Liệt kê tất cả
export const getdata = () =>
    beersDatabase
        .allDocs({
            include_docs: true,
            descending: true,
        })
        .then(doc => doc.rows.map(row => row.doc))
//Lắng nghe các thay đổi
export const ondataUnitChange = callback =>
        beersDatabase.changes({ since: "now", live: true}).on("change", callback)