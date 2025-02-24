document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const params = new URLSearchParams(window.location.search);
    console.log('Query param upload:', params.get('upload'));
    if (params.get('upload') === 'success') {
        const alertBox = document.getElementById('uploadAlert');
        alertBox.style.display = 'block';
        console.log('Upload success alert displayed');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
