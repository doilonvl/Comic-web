const calTime = (pastTime) => {
    let value = new Date() - new Date(pastTime);
    if (Math.floor((value / 3600) / 60) < 60) {
        if (Math.floor((value / 3600) / 60) === 0) {
            return `Vài giây trước`
        } else {
            return `${Math.floor((value / 3600) / 60)} phút trước`
        }
    } else if ((Math.floor((value / 3600) / 60 / 24)) < 24) {
        return `${(Math.floor((value / 3600) / 60 / 24))} giờ trước`
    } else if ((Math.floor((value / 3600) / 60 / 24 / 30)) < 30) {
        return `${(Math.floor((value / 3600) / 60 / 24 / 30))} ngày trước`
    } else if ((Math.floor((value / 3600) / 60 / 24 / 30 / 12) < 12)) {
        return `${(Math.floor((value / 3600) / 60 / 24 / 30 / 12))} tháng trước`
    } else {
        return `${(Math.floor((value / 3600) / 60 / 24 / 30 / 12 / 11))} năm trước`
    }
}
export default calTime;