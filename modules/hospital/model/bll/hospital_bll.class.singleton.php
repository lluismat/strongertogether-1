<?php

class hospital_bll {
    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = hospital_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function create_hospitals_BLL($arrArgument) {
        return $this->dao->create_hospitals_DAO($this->db, $arrArgument);
    }

    public function update_BLL($arrArgument) {
        return $this->dao->update_DAO($this->db, $arrArgument);
    }

    public function count_BLL($arrArgument) {
        return $this->dao->count_DAO($this->db, $arrArgument);
    }

    public function select_BLL($arrArgument) {
        return $this->dao->select_DAO($this->db, $arrArgument);
    }
}
