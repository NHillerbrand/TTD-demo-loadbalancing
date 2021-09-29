export class Resource {
    constructor(cpu, memory, bandwidth) {
        this.cpu = cpu;
        this.memory = memory;
        this.bandwidth = bandwidth;
    }
}

export class Server  {
    constructor(overallResource) {
        this.overallResource = overallResource;
        this.leftResource = overallResource;
        this.allocatedVMs = [];
    }

    addVM(vm) {
        let {cpu, memory, bandwidth} = this.leftResource;
        this.leftResource = new Resource(cpu - vm.cpu, memory - vm.memory, bandwidth - vm.bandwidth);
        this.allocatedVMs.push(vm);
        return this;
    }
    fits(vm) {
        let {cpu, memory, bandwidth} = this.leftResource;
        return vm.cpu <= cpu && vm.memory <= memory && vm.bandwidth <= bandwidth;
    }
}

export const optimze = (allocatedVMs, serverType) => {
    let serverInUse = [createServer(serverType)];
    allocatedVMs.forEach(vm => {
        let serverIndex = getFittingServer(vm, serverInUse);
        if( serverIndex === -1) {
            serverInUse.push(createServer(serverType).addVM(vm));
            return;
        }
        serverInUse[serverIndex].addVM(vm);        
    });
    return serverInUse;
}

const getFittingServer = (vm, serverInUse) => {
    let serverIndex = serverInUse.forEach((server, idx) => {
        if(server.fits(vm)) return idx;
    })
    return serverIndex ?? -1;


}

const createServer = (serverType) => new Server(serverType);




