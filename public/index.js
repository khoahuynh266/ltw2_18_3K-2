var notify = (message)=>{
    $('#thongbao').text(message)
    $('#thongbao').prop('hidden',false)
    $('#tinh').prop('disabled',true)
} 

var kiemtra = ()=>{
    var a = $('#a').val()
    var b = $('#b').val()
    if(a == '')
        return notify('Bạn chưa nhập số thứ nhất')
    if(isNaN(a))
        return notify('Số thứ nhất không phải là số thực')
    if(b == '')
        return notify('Bạn chưa nhập số thứ hai')
    if(isNaN(b))
        return notify('Số thứ hai không phải là số thực')
    if(!$("input[name='operator']:checked").val())
        return notify('Vui lòng chọn phép tính')
    $('#thongbao').prop('hidden',true)
    $('#tinh').prop('disabled',false)
}

$('#a').on('blur',()=> kiemtra())
$('#b').on('blur',()=> kiemtra())
$("input[name='operator']").on('change',()=>kiemtra())

$('#tinh').on('click',(e)=>{
    e.preventDefault()
    var a = $('#a').val()
    var b = $('#b').val()
    var operator = $("input[name='operator']:checked").val()
    $.ajax({
        type:'POST',
        url: '/api/tinh',
        data:{a,b,operator},
        success: (res)=>{
            $('#kq').val(res)
            $('#tinh').val('Tính')
        }
    })
})