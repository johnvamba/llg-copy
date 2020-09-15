import Swal from 'sweetalert2';

export const swalCreate = async (url) => {
    Swal.fire({
        text: 'Redirecting...',
        icon: 'success',
        title: 'Successfully created!',
        showCancelButton: false,
        timer: 2000,
        onClose: () => {
            window.location = url;
        }
    })
}

export const swalUpdate = async (url) => {
    Swal.fire({
        text: 'Redirecting...',
        icon: 'success',
        title: 'Successfully updated!',
        showCancelButton: false,
        timer: 2000,
        onClose: () => {
            window.location = url;
        }
    })
}

export const swalDelete = async (name) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You will delete this ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                Swal.fire({
                    text: 'Refreshing records...',
                    icon: 'success',
                    title: `${name} has been deleted!`,
                    showCancelButton: false,
                    timer: 2000,
                    onClose: () => {
                        location.reload();
                        resolve(true);
                    }
                })
            }
        })
    });
}