export default function(context) {
    console.log('sssss')
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}