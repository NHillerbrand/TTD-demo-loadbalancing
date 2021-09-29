export class LoadBalancer {
    constructor(serverCapacity) {
        this.serverInUse = [];
        this.allocatedVMs = [];
        this.serverCapacity = serverCapacity;
    }
    get lastServerAdded () {
        return this.serverInUse[this.serverInUse.length - 1];
    }

    bookServer() {
        this.serverInUse.push(new Server(this.serverCapacity));
    }

    allocateVMs(vms) {
        if (vms == undefined || vms.length === 0) return;
        vms.forEach(vm => {
            const firstMatchingServer = this.serverInUse.findIndex(server => server.hasResourcesFor(vm) === true);
            if(firstMatchingServer === -1) {
                this.bookServer();
                this.lastServerAdded.bookVM(vm);
                return;
            }
            this.serverInUse[firstMatchingServer].bookVM(vm);
        });
    }

}

export class Server {
    constructor(specifications) {
        const {cpu, memory, bandwidth} = specifications;
        this.resources = new Resource(cpu, memory, bandwidth);
        this.allocatedVMs = [];
    }

    get lastVMAdded() {
        return this.allocatedVMs[this.allocatedVMs.length - 1];
    }


    bookVM(vm) {
        if(this.hasResourcesFor(vm)) {
            this.useResources(vm);
            this.allocatedVMs.push(vm);
        }
    }

    useResources(resource) {
        this.resources.reduceCapacityBy(resource);
    }

    hasResourcesFor(resource) {
        return this.resources.hasCapacityFor(resource);
    }
}

export class Resource {
    constructor(cpu, memory, bandwidth) {
        this.cpu = cpu;
        this.memory = memory;
        this.bandwidth = bandwidth;
    }

    reduceCapacityBy(resource) {
        const {cpu, memory, bandwidth} = resource;
        this.cpu -= cpu;
        this.memory -= memory;
        this.bandwidth -=bandwidth;
    }

    hasCapacityFor(resource) {
        return Object.keys(resource).every(property => resource[property] <= this[property])
    }
}