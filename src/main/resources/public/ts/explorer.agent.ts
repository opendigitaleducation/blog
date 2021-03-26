import http from 'axios';
import { AbstractBusAgent, ACTION, GetContextParameters, IContext, ManagePropertiesParameters, ManagePropertiesResult, PROP_MODE, PROP_TYPE, RESOURCE } from 'ode-ts-client';
import { IHandler } from 'ode-ts-client/dist/ts/foundation/Agent';

class ExplorerAgent extends AbstractBusAgent {
    constructor() {
        super( RESOURCE.BLOG );
		this.registerHandlers();		
    }

    protected ctx:IContext|null = null;

    protected registerHandlers(): void {
        this.setHandler( ACTION.OPEN,   	this.onOpen as unknown as IHandler );
        this.setHandler( ACTION.MANAGE,     this.onManage as unknown as IHandler );
    }

    onOpen( parameters:GetContextParameters ): void {
        // TODO navigate to the correct URL. 
        // The "open" action should not be called by mobile clients...
    }

    onManage( parameters:ManagePropertiesParameters ): Promise<ManagePropertiesResult> {
        const res:ManagePropertiesResult = {
            properties:[{
                property:"name", mode:PROP_MODE.READWRITE, type:PROP_TYPE.TEXT
            },{
                property:"thumbnail", mode:PROP_MODE.READONLY, type:PROP_TYPE.IMAGE
            }]
        }
        return Promise.resolve().then( () => res );
    }
}

let agent = new ExplorerAgent();