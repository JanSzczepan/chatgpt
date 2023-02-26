export default async function deleteQueryBatch(
   adminDb: FirebaseFirestore.Firestore,
   query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
   resolve: (value?: unknown) => void
) {
   const snapshot = await query.get()

   const batchSize = snapshot.size
   if (batchSize === 0) {
      resolve()
      return
   }

   const batch = adminDb.batch()
   snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
   })
   await batch.commit()

   process.nextTick(() => {
      deleteQueryBatch(adminDb, query, resolve)
   })
}
