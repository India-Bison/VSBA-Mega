import { File } from '@src/models/file.model';
import { Op } from 'sequelize';


export const cheeck_oprhan_file_and_delete = async (transaction: any) => {
    let files: any = await find_files(transaction);
    if (files.length > 0) {
        for (const file of files) {
            console.log(`🗑️ Deleting expired file: ${file.name}`);
            await File.destroy({ where: { id: file.id }, transaction });
        }
    } else {
        console.log('✅ No expired orphan files to delete.');
    }
}

async function find_files(transaction: any) {
    try {

        const now = new Date().toISOString();
        const expired_files = await File.findAll(
            {
                where: {
                    orphan: true,
                    expiry: { [Op.lt]: now },
                }, raw: true, transaction
            },
        );
        return expired_files;
    } catch (error) {
        console.error('❌ Error finding expired orphan files:', error);
    }
}