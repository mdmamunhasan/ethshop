$(function () {
    $('.navbar-toggle-sidebar').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        $('#search').removeClass('in').addClass('collapse').slideUp(200);
    });

    $('#search-trigger').click(function () {
        $('.navbar-nav').removeClass('slide-in');
        $('.side-body').removeClass('body-slide-in');
        $('.search-input').focus();
    });

    $(document).on('change', '#image_chooser', handleFileUpload);
});

function handleFileUpload() {
    event.preventDefault();
    $('#save_button').attr('disabled', 'disabled');
    const reader = new FileReader();
    reader.onloadend = function () {
        const ipfs = window.IpfsApi('localhost', 5001); // Connect to IPFS 34.195.183.184
        const buf = buffer.Buffer(reader.result); // Convert data into buffer
        ipfs.files.add(buf, function (err, result) { // Upload buffer to IPFS
            if (err) {
                console.error(err)
                return;
            }
            var image_url = 'https://ipfs.io/ipfs/' + result[0].hash;
            console.error(image_url)
            $('#input_image').val(image_url);
            $('#feature_image').attr('src', image_url);
            $('#feature_image').attr('alt', result[0].hash);
            $('#save_button').removeAttr('disabled');
        });
    };

    const photo = document.getElementById("image_chooser");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
}