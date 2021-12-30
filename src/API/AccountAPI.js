import PouchDB from 'pouchdb'

//Khai báo cơ sở dữ liệu cục bộ
const accountDatabase = new PouchDB("account")
//Khai báo cơ sở dữ liệu từ xa
const remoteAccountDatabase = new PouchDB('http://admin:admin@192.168.1.100:30984/account')
// Đồng bộ hóa cơ sở dữ liệu cục bộ và từ xa
PouchDB.sync(accountDatabase, remoteAccountDatabase, {
    live: true,
    timeout: false, //Vô hiệu hóa thời gian chờ
    retry: true,    //Thử đồng bộ lại nếu thất bại
})
//Nếu cơ sở dữ liệu bia chưa tồn tại => được tạo tự động khi một đối tượng được thêm mới
export const addData = data => accountDatabase.post(data)
//Cap nhat bia
export const editData = data => accountDatabase.put(data)
// Xoa bia
export const removeData = data => accountDatabase.get(data).then(doc =>accountDatabase.remove(doc._id, doc._rev))
//Liệt kê tất cả
export const getData = () =>
    accountDatabase
        .allDocs({
            include_docs: true,
            descending: true,
        })
        .then(doc => doc.rows.map(row => row.doc))
//Lắng nghe các thay đổi
export const onDataChange = callback =>
        accountDatabase.changes({ since: "now", live: true}).on("change", callback)