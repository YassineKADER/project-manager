import { Card, Modal } from "@mui/material"


export const AddTask = ()=>{
    return (
        <Modal open={false}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
        <Card
        style={{
          minWidth: "50%",
          minHeight: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"column"
        }}
      >
      
      
      </Card>
        </Modal>
    )
}