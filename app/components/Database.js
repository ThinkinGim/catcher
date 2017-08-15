import * as RxDB from 'rxdb'
import { RxDatabase, QueryChangeDetector } from 'rxdb';

RxDB.plugin(require('pouchdb-adapter-idb'));

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

const collections = [
    {
        name: 'projects',
        schema: {
            'title': 'projects',
            'descrption': 'describes a project',
            'version': 0,
            'properties': {
                'name': {
                    'type': 'string',
                    'primary': true
                },
                'description': {
                    'type': 'string'
                }
            },
        },
        methods: {
            hpPercent() {
                return true;
            }
        },
        sync: true
    },
    {
        name: 'tickets',
        schema: {
            'title': 'tickets',
            'descrption': 'to display tickets',
            'version': 0,
            'properties': {
                'id': {
                    'type': 'string',
                    'primary': true
                },
                'title': {
                    'type': 'string'
                },
                'reporter': {
                    'type': 'string'
                },
                'sql': {
                    'type': 'string'
                },
            },
        },
        methods: {
            hpPercent() {
                return true;
            }
        },
        sync: true
    },
    {
        name: 'quires',
        schema: {
            'title': 'quires',
            'descrption': 'to display tickets',
            'version': 0,
            'properties': {
                'id': {
                    'type': 'string',
                    'primary': true
                },
                'sql': {
                    'type': 'string'
                },
                'comment': {
                    'type': 'string'
                },
            },
        },
        methods: {
            hpPercent() {
                return true;
            }
        },
        sync: true
    },
];

let dbPromise = null;

const _create = async function () {
    console.log('DatabaseService: creating database..');
    const db = await RxDB.create({ name: 'appdb', adapter: 'idb' });
    console.log('DatabaseService: created database');
    // window['db'] = db; // write to window for debugging

    // create collections
    console.log('DatabaseService: create collections');
    // db.remove();
    await Promise.all(collections.map(colData => db.collection(colData)));

    return db;
};

export function get() {    
    if (!dbPromise)
        dbPromise = _create();    
    return dbPromise;
}