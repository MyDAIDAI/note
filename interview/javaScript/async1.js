setTimeout(() => {
    console.log(1);
})
function foo () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(2);
            resolve(3);
            
            console.log(4);
        })
         console.log(0)
    })
}
async function get() {
    const result = await foo();
    console.log('result', result);
    // try {
    //     const result = await foo();
    //     console.log('result', result);
    // } catch(e) {
    //     console.log('error', e)
    // }
}
get()
