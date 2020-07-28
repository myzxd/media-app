// Network interfaces
const ifaces = require('os').networkInterfaces();
const defaultIp = '0.0.0.0';

function getIp() {
    // Local ip address that we're trying to calculate
    let address;
    // Iterate over interfaces ...
    for (var dev in ifaces) {

        // ... and find the one that matches the criteria
        var iface = ifaces[dev].filter(function(details) {
            return details.family === 'IPv4'
            && details.internal === false
            && details.mac !== '00:00:00:00:00:00';
        });

        if(iface.length > 0) address = iface[0].address;
    }
    return address || defaultIp;
}

module.exports = getIp;
