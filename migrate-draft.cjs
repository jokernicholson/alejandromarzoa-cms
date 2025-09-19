const { MongoClient } = require('mongodb');

async function migrateToDraft() {
  const uri = 'mongodb+srv://david_db_user:i7mMj2KkdrpbFuhf@cluster0.yz1fx5w.mongodb.net/alejandromarzoa?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('🚀 Conectado a MongoDB');

    const db = client.db('alejandromarzoa');

    // Migrar proyectos
    console.log('📝 Migrando proyectos...');
    const proyectosResult = await db.collection('proyectos').updateMany(
      { _status: { $exists: false } },
      { $set: { _status: 'published' } }
    );
    console.log(`✅ ${proyectosResult.modifiedCount} proyectos actualizados`);

    // Migrar media
    console.log('🎬 Migrando archivos multimedia...');
    const mediaResult = await db.collection('media').updateMany(
      { _status: { $exists: false } },
      { $set: { _status: 'published' } }
    );
    console.log(`✅ ${mediaResult.modifiedCount} archivos multimedia actualizados`);

    console.log('🎉 ¡Migración completada exitosamente!');

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  } finally {
    await client.close();
  }
}

migrateToDraft();
