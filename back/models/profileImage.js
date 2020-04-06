module.exports = (sequelize, DataTypes) => {
    const ProfileImage = sequelize.define('ProfileImage', { //앞에 대문자로 만들면 테이블 만들어질 때 자동으로 앞에 소문자로 바뀌고 뒤에 s붙음
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', //한글에 이모티콘까지 가능
        collate: 'utf8mb4_general_ci',
    });

    sequelize.query('CREATE TRIGGER trigger_default_image AFTER INSERT ON users' +
        ' FOR EACH ROW' +
        ' BEGIN' +
        ' insert into profileimages (src, createdAt, updatedAt, userid) values("KakaoTalk_20190526_1309307561585741495097", NOW(), NOW(), new.id);' +
        'END;')
    
    // CREATE TRIGGER trigger_default_image
    // AFTER INSERT ON users
    // FOR EACH ROW
    // BEGIN
    // INSERT INTO profileimages(src, createdAt, updatedAt)
    // VALUES("ddd", NOW(), NOW());
    // END;
    ProfileImage.associate = (db) => {
        db.ProfileImage.belongsTo(db.User);
    };
    return ProfileImage;
}