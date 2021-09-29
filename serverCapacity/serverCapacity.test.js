import {LoadBalancer, Resource, Server} from './serverCapacity';

describe('A LoadBalancer', () => {

    let loadBalancer, serverResources, allocatedVMs;
    beforeEach(() => {
        serverResources = new Resource(1000,2000,1000);
        loadBalancer = new LoadBalancer(serverResources);
        allocatedVMs = [
            new Resource(500,500,500),
            new Resource(600,600,600),
            new Resource(200,200,200),
            new Resource(400,400,400),
            new Resource(200, 200, 200)
        ];

    })

    it('has initially no server in use', () => {
        expect(loadBalancer.serverInUse).toEqual([]);
    });
    it('has initially no allocated vms', () => {
        expect(loadBalancer.allocatedVMs).toEqual([]);
    });

    it('can add one Server', () => {
        loadBalancer.bookServer(serverResources);
        expect(loadBalancer.lastServerAdded).not.toBeUndefined;
        expect(loadBalancer.lastServerAdded).toEqual(new Server(serverResources));
    });

    it('can allocate vms on one server', () => {
        loadBalancer.allocateVMs(allocatedVMs);
        expect(loadBalancer.serverInUse.length).toBe(2); 
        
    })
})

describe('A Server', () => {

    let serverResources, server, validVM, inValidVM;
    beforeEach(() => {
        serverResources = new Resource(1000,2000,1000);
        server =  new Server(serverResources);
        validVM = new Resource(100,100,100);
        inValidVM = new Resource(10000,10000,10000);
    })

    it('has initially specifications', () => {
        expect(server.resources).toEqual(serverResources);
    })

    it('VM List is initially empty', () => {
        expect(server.allocatedVMs).toEqual([]);
    })

    it('can be checked on capacity', () => {
        expect(server.hasResourcesFor(validVM)).toBeTruthy;
        expect(server.hasResourcesFor(inValidVM)).toBeFalsy;

    })

    it('can be booked by a vm', () => {
        server.bookVM(validVM);
        expect(server.lastVMAdded).toBe(validVM);
    })

    it('can not be overbooked', () => {
        expect(server.lastVMAdded).not.toBe(inValidVM);
    })

    it('capacity can be used', () => {
        const expectedResource = new Resource(serverResources.cpu - validVM.cpu, serverResources.memory - validVM.memory, serverResources.bandwidth - validVM.bandwidth)
        server.useResources(validVM);
        expect(server.resources).toEqual(expectedResource);
    })

    it('reduces capacity after booking vm', () => {
        const startCapacity = new Server(serverResources).resources;
        server.bookVM(validVM);
        const {cpu, memory, bandwidth} = server.resources;
        expect(cpu).toBe(startCapacity.cpu - validVM.cpu);
        expect(memory).toBe(startCapacity.memory - validVM.memory);
        expect(bandwidth).toBe(startCapacity.bandwidth - validVM.bandwidth);
    })
    

})

describe('A Resource', () => {

        let resource;
    beforeEach(() => {
        resource = new Resource(100, 100, 100);
    })
    it('is initially not empty', () => {
        expect(resource).not.toEqual({});
    })
})