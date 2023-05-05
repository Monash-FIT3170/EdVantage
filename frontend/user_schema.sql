--SET ECHO ON
--SPOOL user_schema_output.txt

DROP TABLE class_enrolment CASCADE CONSTRAINTS;

DROP TABLE class CASCADE CONSTRAINTS;

DROP TABLE unit CASCADE CONSTRAINTS;

DROP TABLE user CASCADE CONSTRAINTS;

CREATE TABLE class_enrolment (
    class_num NUMBER(50) NOT NULL,
    unit_code VARCHAR2(50) NOT NULL,
    user_id   VARCHAR2(50) NOT NULL
);

ALTER TABLE class_enrolment ADD CONSTRAINT class_enrolment_pk PRIMARY KEY ( unit_code,
                                                                            user_id );

CREATE TABLE class (
    class_num NUMBER(50) NOT NULL,
    unit_code VARCHAR2(50) NOT NULL
);

ALTER TABLE class ADD CONSTRAINT class_enrolment_pk PRIMARY KEY ( unit_code,
                                                                  user_id );

CREATE TABLE unit (
    unit_code VARCHAR2(50) NOT NULL
);

ALTER TABLE unit ADD CONSTRAINT unit_pk PRIMARY KEY ( unit_code );

CREATE TABLE user (
    user_email VARCHAR2(50) NOT NULL,
    user_id    VARCHAR2(50) NOT NULL
);

ALTER TABLE user ADD CONSTRAINT user_pk PRIMARY KEY ( user_id );

ALTER TABLE class_enrolment
    ADD CONSTRAINT class_enrolment_class FOREIGN KEY ( class_num )
        REFERENCES class ( class_num );

ALTER TABLE class_enrolment
    ADD CONSTRAINT class_enrolment_unit FOREIGN KEY ( unit_code )
        REFERENCES unit ( unit_code );

ALTER TABLE class_enrolment
    ADD CONSTRAINT class_enrolment_user FOREIGN KEY ( user_id )
        REFERENCES user ( user_id );

ALTER TABLE class
    ADD CONSTRAINT class_unit FOREIGN KEY ( unit_code )
        REFERENCES unit ( unit_code );

--SPOOL OFF
--SET ECHO OFF